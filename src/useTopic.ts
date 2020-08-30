// import Vue from 'vue'
import { valueTask, IValueTask } from './valueTask'
import { Ref } from '@vue/composition-api'

// Vue.use(VueCompositionApi)

// https://github.com/vuejs/composition-api/issues/138
// https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.1/packages/eslint-plugin/docs/rules/ban-types.md
interface ISubscriptionReference
{
  subscribers : Set<symbol>
  valueTask : IValueTask<unknown>
}

export interface ISubscription<T>
{
  subscriber : symbol
  valueTask : IValueTask<T>
  id: string
  unSubscribe(): void
  refreshEvent? : Ref<IEventMessage>
}
export interface IUseOptions<T>
{
  asyncState? : (id:string) => Promise<T>
  // usePublishRequestEvent? : string //非同期API取得用に作成したが未使用
  useRefreshEvent? : string // watchはコンポーネントsetup内部でしか動作しないため未使用
  // publishOnRefresh? : boolean // refresh時にTopic内でPublish するかどうか
  synbolDescription? : string
  testID? :string
}

const defaultOptions = {
  useRefreshEvent: '',
  // usePublishRequestEvent: '',
  // publishOnRefresh: false,
  synbolDescription: 'subscriber',
  testID: 'test'
}

export function useTopic<T> (initialState : (id:string) => T, useOptions? : IUseOptions<T>) {
  console.log('Topic init')
  // Subscriptions
  const subscriptions = new Map<string, ISubscriptionReference>()
  // Private Setting
  const options = useOptions ? Object.assign(defaultOptions, useOptions) : defaultOptions
  // RefreshEvent
  const refreshEventSubscription = options.useRefreshEvent ? eventTopic.subscribe(options.useRefreshEvent) : undefined
  // Publish Function
  const publish = (id: string, data: T) => {
    const subscription = subscriptions.get(id)
    if (subscription) {
      subscription.valueTask.state.value = data
    }
  }
  // Subscribe Function
  const subscribe = (id : string) : ISubscription<T> => {
    const subscriber = Symbol(options.synbolDescription)
    let value : IValueTask<T>
    const subscription = subscriptions.get(id)
    if (subscription) {
      subscription.subscribers.add(subscriber)
      value = <IValueTask<T>>subscription.valueTask
    } else {
      const asyncState = useOptions && useOptions.asyncState ? useOptions.asyncState(id) : undefined
      value = valueTask<T>(initialState(id), asyncState) // <Ref<T>>ref<T>()
      subscriptions.set(id, { subscribers: new Set([subscriber]), valueTask: value })
    }
    return {
      id,
      subscriber,
      valueTask: value,
      unSubscribe: () => { unSubscribe(id, subscriber) },
      refreshEvent: refreshEventSubscription ? refreshEventSubscription.valueTask.state : undefined
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
    console.log('refresh')
    const subscription = subscriptions.get(id)
    if (subscription) {
      if (useOptions && useOptions.asyncState) {
        const taskValue = <IValueTask<T>>subscription.valueTask
        const asyncState = useOptions && useOptions.asyncState ? useOptions.asyncState(id) : undefined
        if (asyncState) {
          return taskValue.refresh(asyncState)
        }
      }
    }
    return undefined
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
export const eventTopic = useTopic<IEventMessage>(() => { return { id: '' } })
