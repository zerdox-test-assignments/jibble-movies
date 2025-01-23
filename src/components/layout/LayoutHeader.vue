<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <span>Jibble Movies</span>
    <nav>
      <RouterLink to="/">Explore</RouterLink>
      <RouterLink to="/user/saved">Favorites</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 2em 2em 1em 2em;
  border-bottom: 1px solid oklch(85% 0 0);
}

nav {
  display: flex;
  gap: 10px;
}

a.router-link-exact-active {
  color: tomato;
}
</style>
