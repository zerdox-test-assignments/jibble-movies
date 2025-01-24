<script setup lang="ts">
const props = defineProps<{
  movies?: DataPaginated<Movie>;
}>();

import { defineProps } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { type DataPaginated } from "@/shared/api/types";
import { type Movie } from "@/entities/movie/model";
import { MovieCard } from "@/entities/movie/ui";
import { useMoviesSearch } from "@/features/movie/ui";

const { params, page } = useMoviesSearch();
const route = useRoute();
</script>

<template>
  <template v-if="props.movies?.data">
    <ul>
      <MovieCard v-for="movie in props.movies.data" :key="movie.imdbID" element="li" :movie />
    </ul>
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul>
        <li v-for="pageNumber in props.movies.total_pages" :key="pageNumber">
          <!--
            this looks crazy but it just prevents p=1 (default) from
            getting into url. also aria-current should be handled properly
          -->
          <RouterLink
            :aria-current="+(params.p ?? 1) === pageNumber ? 'page' : undefined"
            :aria-label="`Goto Page ${pageNumber}`"
            :to="{
              query: {
                ...route.query,
                q: params.q || undefined,
                p: pageNumber !== 1 ? pageNumber : undefined,
              },
            }"
            @click="() => page(pageNumber)"
          >
            {{ pageNumber }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </template>
</template>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
