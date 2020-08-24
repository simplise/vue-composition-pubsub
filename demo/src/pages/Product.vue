<template>
  <q-page>
    <div class="row items-center justify-evenly">
      <h3>Product </h3>
    </div>
    <product-subscriber :id='id' ></product-subscriber>
  </q-page>
</template>

<script lang="ts">
import ProductSubscriber from 'src/components/ProductSubscriber.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Product',
  components: { ProductSubscriber },
  setup () {
    return { id: 'testValue' }
  }
})
</script>
