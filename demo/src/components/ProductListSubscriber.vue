<template>
  <div>
    <div class="row" >
      <div class="signalr-demo col-sm">
        <hr />
        <q-form
          @submit="onSubmit"
          class="q-gutter-md">
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
      </div>
    </div>
    <div class="row" v-for="product in state" v-bind:key="product.id">
      <div class="col-sm">
        <hr />
        <div>
          <div style="display: inline-block; padding-left: 12px;">
                <div>
                  <span class="text-info small"><strong>{{ product.timestamp }}</strong></span>
                </div>
            <div>
              {{ product.id }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch } from '@vue/composition-api'
import { uid } from 'quasar'
import useProductListStore from '../compositionStore/useProductListStore'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { subscribe, refresh } = useProductListStore()
    const subscription = subscribe(props.id)
    const state = subscription.valueTask.state
    onBeforeUnmount(() => {
      subscription.unSubscribe()
    })
    const onSubmit = () => {
      console.log('onSubmit')
      state.value.unshift({ id: uid(), timestamp: Date.now() })
      state.value[1].id = uid()
    }
    if (subscription.refreshEvent) {
      watch(subscription.refreshEvent, async (event) => {
        await refresh(event.id)
      })
    }
    return {
      state,
      onSubmit
    }
  }
})
</script>
