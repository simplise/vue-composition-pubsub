<template>
  <div>
    <div class="row" >
      <div class="signalr-demo col-sm">
        <q-field filled label="Label" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{state.title}}</div>
          </template>
        </q-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch } from '@vue/composition-api'
import useProductDataStore from '../compositionStore/useProductDataStore'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { subscribe, refresh } = useProductDataStore()
    const subscription = subscribe(props.id)
    const state = subscription.valueTask.state
    onBeforeUnmount(() => {
      subscription.unSubscribe()
    })
    if (subscription.refreshEvent) {
      watch(subscription.refreshEvent, async (event) => {
        await refresh(event.id)
      })
    }
    return {
      state
    }
  }
})
</script>
