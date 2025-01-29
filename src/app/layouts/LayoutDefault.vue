<script setup lang="ts">
import Header from "./components/LayoutHeader.vue";
import Footer from "./components/LayoutFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="ViewHome">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
  <Footer />
</template>

<style scoped lang="scss">
main {
  --page-content-x-padding: 2em;
  padding: 0 var(--page-content-x-padding) 2em;
}
</style>
