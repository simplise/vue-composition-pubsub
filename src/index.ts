// import Vue from 'vue'
import { ref, Ref, reactive } from '@vue/composition-api' //VueCompositionApi , 

// Vue.use(VueCompositionApi)

// https://github.com/vuejs/composition-api/issues/138
// https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.1/packages/eslint-plugin/docs/rules/ban-types.md
interface ISubscriptionReference
{
  subscribers : Set<symbol>
  data : Ref<unknown>
}

interface ISubscription<T>
{
  subscriber : symbol
  data : Ref<T>
  id: string
  unSubscribe(): void
  refreshEvent? : Ref<IEventMessage>
}
interface IUseOptions
{
  // usePublishRequestEvent? : string //非同期API取得用に作成したが未使用
  useRefreshEvent? : string //watchはコンポーネントsetup内部でしか動作しないため未使用
  publishOnRefresh? : boolean // refresh時にTopic内でPublish するかどうか
  synbolDescription? : string
  testID? :string
}

const defaultOptions = { 
  useRefreshEvent : '', 
  // usePublishRequestEvent: '', 
  publishOnRefresh: false,
  synbolDescription: 'subscriber', 
  testID: 'test' }

// https://qiita.com/suin/items/e8cf3404161cc90821d8
// https://qiita.com/usk81/items/cc7541c2b50d47373e32
const isObject = (x: unknown): boolean => x !== null && typeof x === 'object' && Object.prototype.toString.call(x) !== '[object Array]'

export default function useTopic<T> (initialData : (id:string,isRefreshRequest?:boolean) => T, useOptions? : IUseOptions) {
  console.log('Topic init')
  // Subscriptions
  const subscriptions = new Map<string, ISubscriptionReference>()
  // Private Setting
  const options = useOptions ? Object.assign(defaultOptions,useOptions) : defaultOptions
  const isObj = isObject(initialData(options.testID))
  // RefreshEvent
  const refreshEventSubscription = options.useRefreshEvent ? eventTopic.subscribe(options.useRefreshEvent) : undefined
  // if(refreshEventSubscription)
  // {
  //   watch(refreshEventSubscription.data , (id) => {
  //     console.log('refreshEvent')
  //     const data =  initialData(id,true)
  //     publish(id, data)
  //   } )
  // }
  // Publish Function
  const publish = (id: string, data: T) => {
    const subscription = subscriptions.get(id)
    if (subscription) {
      if (isObj) {
        subscription.data.value = reactive(<Record<string, unknown>>data)
      } else {
        subscription.data.value = data
      }
    }
  }
  // Subscribe Function
  const subscribe = (id : string) : ISubscription<T> => {
    const subscriber = Symbol(options.synbolDescription)
    let data : Ref<T>
    const subscription = subscriptions.get(id)
    if (subscription) {
      subscription.subscribers.add(subscriber)
      data = <Ref<T>>subscription.data
    } else {
      if(isObj)
      {
        data = <Ref<T>>ref<T>(<T>reactive(<Record<string, unknown>>initialData(id)))
      }
      else
      {
        data = <Ref<T>>ref<T>(initialData(id))
      }
      subscriptions.set(id, { subscribers: new Set([subscriber]), data })
    }
    // if(options.useRefreshEvent && refreshEventSubscription)
    // {
    //    refreshEventSubscription.data
    // }
    // if (options.usePublishRequestEvent) {
    //   stringEventTopic.publish(options.usePublishRequestEvent, id)
    // }
    return {
      id,
      subscriber,
      data,
      unSubscribe: () => { unSubscribe(id, subscriber) },
      refreshEvent: refreshEventSubscription ? refreshEventSubscription.data : undefined
    }
  }
  // UnSubscribe Function
  const unSubscribe = (id : string, subscriber : symbol): void => {
    const subscription = subscriptions.get(id)
    if (subscription) {
      subscription.subscribers.delete(subscriber)
      if (subscription.subscribers.size === 0) {
        subscriptions.delete(id)
      }
    }
  }
  // Publish Function
  const refresh = (id: string) => {
    if(options.publishOnRefresh)
    {
      publish(id,initialData(id,true))
    }
    else
    {
      initialData(id,true)
    }
  }
  // Result
  return {
    publish,
    subscribe,
    refresh
  }
}
interface IEventMessage
{
  id : string
  payload? : unknown
}
export const eventTopic = useTopic<IEventMessage>(() => { return { id:''}} )

