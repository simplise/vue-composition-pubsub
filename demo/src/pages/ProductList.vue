<template>
  <q-page>
    <div class="row items-center justify-evenly">
      <h3>Product List</h3>
    </div>
    <product-subscriber :id='id' ></product-subscriber>
  </q-page>
</template>

<script lang="ts">
import ProductSubscriber from 'src/components/ProductListSubscriber.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Product',
  components: { ProductSubscriber },
  setup () {
    return { id: 'product-query' }
  }
})
</script>
