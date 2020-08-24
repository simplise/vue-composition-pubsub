<template>
  <q-page>
    <div class="row items-center justify-evenly">
      <h3>Event Subscription</h3>
    </div>
    <message-publisher />
    <message-subscriber />
  </q-page>
</template>

<script lang="ts">
import MessagePublisher from 'src/components/MessagePublisher.vue'
import MessageSubscriber from 'src/components/MessageSubscriber.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  components: { MessagePublisher, MessageSubscriber },
  setup () {
    return { }
  }
})
</script>
