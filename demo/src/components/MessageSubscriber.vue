<template>
  <div>
    <div class="row" v-for="message in messages" v-bind:key="message.id">
      <div class="col-sm">
        <hr />
        <div>
          <div style="display: inline-block; padding-left: 12px;">
                <div>
                  <span class="text-info small"><strong>{{ message.sender }}</strong></span>
                </div>
            <div>
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
</script>
