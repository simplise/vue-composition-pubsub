# vue-composition-pubsub

https://simplise.github.io/vue-composition-pubsub/

A component to handle global events and data 


## Installation

### NPM

```bash
npm install vue-composition-pubsub
# or
yarn add vue-composition-pubsub
```

### Event Stream

Create Topic

```ts
import useTopic from 'vue-composition-pubsub'

export interface IMessage{
  id : string
  text : string
  sender : string
}

function useMessageTopic () {
  const initialData = () => { return { id: '', text: '', sender: '' } }
  const subscription = useTopic<IMessage>(initialData)
  return {
    ...subscription
  }
}

const messageTopic = useMessageTopic()

export default messageTopic
```

Publish Message

```ts
import { uid } from 'quasar'
import { defineComponent, reactive } from '@vue/composition-api'
import messageTopic from 'src/compositionStore/messageTopic'

export default defineComponent({
  setup () {
    const state = reactive({
      newMessage: '',
      sender: ''
    })
    const { publish } = messageTopic
    const sendMessage = () => {
      const id = uid()
      publish('message', { id, text: state.newMessage, sender: state.sender })
      state.newMessage = ''
    }
    return {
      state,
      sendMessage
    }
  }
})
```

Subscribe Message

```ts
import { defineComponent, onBeforeUnmount, watch, ref } from '@vue/composition-api'
import messageTopic, { IMessage } from 'src/compositionStore/messageTopic'

export default defineComponent({
  setup () {
    const messages = ref<Array<IMessage>>([])
    const { subscribe } = messageTopic
    const subscription = subscribe('message')
    watch(subscription.data, (value) => {
      console.log('subscribe')
      messages.value.unshift(value)
    })
    onBeforeUnmount(() => {
      subscription.unSubscribe()
    })
    return {
      messages
    }
  }
})
```

### CacheFirst DataStore 

Create Store 

```ts
import useTopic from 'vue-composition-pubsub'
import { SessionStorage, date } from 'quasar'

export interface IProduct{
  id : string
  title : string
  price : number
  timestamp : number // Unix Time , 0 = Initializing
}

function useProductDataStore () {
  console.log('useProductDataStore')
  // Cache First API Second Storategy
  const initialData = (id:string) => {
    // Emulate Fetch Function
    setTimeout(() => {
      const fetcheData : IProduct = { id, title: `Created ${date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')}`, price: 0, timestamp: Date.now() }
      SessionStorage.set(id, fetcheData)
      subscription.publish(id, fetcheData)
    }, 1000)
    // Cache First
    const cacheData = SessionStorage.getItem<IProduct>(id)
    if (cacheData) {
      return cacheData
    }
    // Initialize Data
    return { id, title: '', price: 0, timestamp: 0 }
  }
  // Return
  const subscription = useTopic<IProduct>(initialData, { useRefreshEvent: 'ProductRefreshEvent' })
  return {
    ...subscription
  }
}

const productDataStore = useProductDataStore()

export default productDataStore
```

Subscribe

```ts
import { defineComponent, onBeforeUnmount, watch } from '@vue/composition-api'
import productDataStore from 'src/compositionStore/productDataStore'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { subscribe, refresh } = productDataStore
    const subscription = subscribe(props.id)
    const state = subscription.data
    onBeforeUnmount(() => {
      subscription.unSubscribe()
    })
    if (subscription.refreshEvent) {
      watch(subscription.refreshEvent, (event) => {
        refresh(event.id)
      })
    }
    return {
      state
    }
  }
})
```
