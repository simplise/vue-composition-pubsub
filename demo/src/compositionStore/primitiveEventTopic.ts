import { useTopic } from 'vue-composition-pubsub' // './use-global'

function usePrimitiveEventTopic () {
  const initialData = () => { return '' }
  const subscription = useTopic<string>(initialData)
  return {
    ...subscription
  }
}
const primitiveEventTopic = usePrimitiveEventTopic()

export default primitiveEventTopic
