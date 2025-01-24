<script setup lang="ts">
const props = defineProps<{
  movies?: Movie[];
}>();

import { defineProps } from "vue";
import { type Movie } from "@/entities/movie/model";
import { MovieCard } from "@/entities/movie/ui";
</script>

<template>
  <template v-if="props.movies">
    <ul>
      <MovieCard v-for="movie in props.movies" :key="movie.imdbID" element="li" :movie />
    </ul>
  </template>
</template>

<style scoped lang="scss">
ul {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
