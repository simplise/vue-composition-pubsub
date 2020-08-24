<template>
  <div class="row" >
    <div class="signalr-demo col-sm">
      <hr />
      <form v-on:submit.prevent="sendMessage">
        <input type="text" v-model="state" id="message-box" class="form-control" placeholder="Type message here..." autocomplete="off" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import primitiveEventTopic from 'src/compositionStore/primitiveEventTopic'

export default defineComponent({
  setup () {
    const state = ref('')
    const { publish } = primitiveEventTopic
    const sendMessage = () => {
      publish('primitiveEvent', state.value)
      state.value = ''
    }
    return {
      state,
      sendMessage
    }
  }
})
</script>
