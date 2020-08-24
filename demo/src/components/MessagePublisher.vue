<template>
  <div class="row" >
    <div class="signalr-demo col-sm">
      <hr />
      <form v-on:submit.prevent="sendMessage">
        <input type="text" v-model="state.newMessage" id="message-box" class="form-control" placeholder="Type message here..." autocomplete="off" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
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
</script>
