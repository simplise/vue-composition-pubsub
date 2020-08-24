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
