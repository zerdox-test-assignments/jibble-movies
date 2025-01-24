<script setup lang="ts">
import { MoviesList } from "@/widgets/movie/ui";
import { useSavedMoviesStore } from "@/entities/movie/model";

const { movies } = useSavedMoviesStore();
</script>

<template>
  <MoviesList :movies="movies" />
</template>
