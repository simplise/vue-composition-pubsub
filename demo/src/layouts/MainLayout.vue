<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'src/components/EssentialLink.vue'

const linksData = [
  {
    title: 'Primitive',
    caption: 'Primitive Value Subscription',
    icon: 'school',
    to: '/'
  },
  {
    title: 'Message',
    caption: 'Object Message Subscription',
    icon: 'code',
    to: '/Message'
  },
  {
    title: 'Product',
    caption: 'Data Cache First API Second Storategy',
    icon: 'chat',
    to: '/Product'
  },
  {
    title: 'ProductList',
    caption: 'Data Cache First API Second Storategy',
    icon: 'chat',
    to: '/ProductList'
  }
]

import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup () {
    const leftDrawerOpen = ref(false)
    const essentialLinks = ref(linksData)

    return { leftDrawerOpen, essentialLinks }
  }
})
</script>
