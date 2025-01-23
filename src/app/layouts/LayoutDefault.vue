<script setup lang="ts">
import Header from "@/components/layout/LayoutHeader.vue";
import Footer from "@/components/layout/LayoutFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped lang="scss">
main {
  --page-content-x-padding: 2em;
  padding: 0 var(--page-content-x-padding) 2em;
}
</style>
