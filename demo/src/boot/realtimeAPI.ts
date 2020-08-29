import { eventTopic } from 'vue-composition-pubsub'
import { boot } from 'quasar/wrappers'
// import productDataStore from 'src/compositionStore/productDataStore'

function useRealtimeAPI () {
  const { publish } = eventTopic
  setInterval(() => {
    console.log('realtimeEvent')
    publish('ProductRefreshEvent', { id: 'testValue' })
    // publish('ProductListRefreshEvent', { id: 'testValue' })
  }, 10000)
}

export default boot(() => {
  useRealtimeAPI()
})
