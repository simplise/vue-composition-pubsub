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
