<script setup lang="ts">
import { searchMovies } from "@/entities/movie/api";
import { injectKy } from "@/app/plugins/ky";
const ky = injectKy();

async function search(event: KeyboardEvent) {
  const title = (event.target as HTMLInputElement).value;
  const movies = await searchMovies(ky, title);
  console.log({ movies });
}
</script>

<template>
  <input type="search" placeholder="What are you going to watch tonight?" @keyup.enter="search" />
</template>

<style scoped lang="scss"></style>
