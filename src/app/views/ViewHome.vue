<script setup lang="ts">
import { ref } from "vue";
import { MovieCard } from "@/entities/movie/ui";
import { searchMovies } from "@/entities/movie/api";
import { injectKy } from "@/app/plugins/ky";
const ky = injectKy();

const movies = ref<Awaited<ReturnType<typeof searchMovies>> | undefined>();
async function searchHandle(event: KeyboardEvent) {
  const title = (event.target as HTMLInputElement).value;
  movies.value = await searchMovies(ky, title);
}
</script>

<template>
  <input
    class="search"
    type="search"
    placeholder="What are you going to watch tonight?"
    @keyup.enter="searchHandle"
  />
  <ul v-if="movies?.data">
    <MovieCard v-for="movie in movies.data" :key="movie.imdbID" element="li" :movie />
  </ul>
</template>

<style scoped lang="scss">
.search {
  margin-bottom: 24px;
}

ul {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
