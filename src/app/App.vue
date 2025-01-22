<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>

<style scoped lang="scss">
div {
  display: contents;
}
</style>
