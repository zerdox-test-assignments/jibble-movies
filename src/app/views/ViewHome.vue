<script setup lang="ts">
import { ref, watch } from "vue";
import { MoviesSearch, MoviesList, MoviesPagination } from "@/widgets/movie/ui";
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
  <MoviesList :movies="movies?.data" />
  <MoviesPagination :pages="movies?.total_pages ?? 0" />
</template>
