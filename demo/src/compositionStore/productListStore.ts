import useTopic from 'vue-composition-pubsub'
import { SessionStorage, uid } from 'quasar'

export interface IItem{
  id : string
  timestamp : number // Unix Time , 0 = Initializing
}

function useProductListStore () {
  console.log('useProductListStore')
  // Cache First API Second Storategy
  const initialData = (id:string) => {
    // Emulate Fetch Function
    setTimeout(() => {
      const fetcheData : Array<IItem> = [{ id: uid(), timestamp: Date.now() }, { id: uid(), timestamp: Date.now() }]
      SessionStorage.set(id, fetcheData)
      subscription.publish(id, fetcheData)
    }, 1000)
    // Cache First
    const cacheData = SessionStorage.getItem<Array<IItem>>(id)
    if (cacheData) {
      return cacheData
    }
    // Initialize Data
    return []
  }
  // Return
  const subscription = useTopic<Array<IItem>>(initialData)
  return {
    ...subscription
  }
}

const productListStore = useProductListStore()

export default productListStore
