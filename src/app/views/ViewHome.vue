<script setup lang="ts">
import { ref, watch } from "vue";
import { MoviesSearch, MoviesList } from "@/widgets/movie/ui";
import { useMoviesSearch } from "@/features/movie/ui";
import { searchMovies } from "@/entities/movie/api";
import { injectKy } from "@/app/plugins/ky";
const ky = injectKy();

const movies = ref<Awaited<ReturnType<typeof searchMovies>> | undefined>();
const { params } = useMoviesSearch();

watch(
  params,
  async () => {
    movies.value = await searchMovies(ky, params.q, +(params.p ?? 1));
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <MoviesSearch />
  <MoviesList :movies="movies" />
</template>

<style scoped lang="scss">
.search {
  margin: 0 calc(-1 * var(--page-content-x-padding)) 22px;
  padding: 12px var(--page-content-x-padding) 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: oklch(100% 0 0);
  position: sticky;
  top: 0;
  animation: search-scroll-border linear both;
  animation-timeline: scroll();
  animation-range: 50px 90px;
  border-bottom: 1px solid transparent;
}
.search__bar {
  display: flex;
  gap: 6px;
}
.search__input {
  flex-grow: 1;
}

@keyframes search-scroll-border {
  to {
    border-bottom-color: oklch(85% 0 0);
  }
}
</style>
