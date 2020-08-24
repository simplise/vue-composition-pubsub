<template>
  <div>
    <div class="row" v-for="(message,index) in messages" v-bind:key="index">
      <div class="col-sm">
        <hr />
        <div>
          <div style="display: inline-block; padding-left: 12px;">
            <div>
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch, reactive } from '@vue/composition-api'
import primitiveEventTopic from 'src/compositionStore/primitiveEventTopic'

export default defineComponent({
  setup () {
    const messages = reactive<Array<string>>([])
    const { subscribe } = primitiveEventTopic
    const subscription = subscribe('primitiveEvent')
    watch(subscription.data, (value) => {
      console.log('subscribe')
      messages.unshift(value)
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
