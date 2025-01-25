<script setup lang="ts">
const props = defineProps<{
  pages?: number;
}>();

import { useMoviesSearch } from "@/features/movie-search/ui";
import { VPagination } from "vuetify/components/VPagination";
const { searchParams, paginate } = useMoviesSearch();

function pageHandle(v: number) {
  paginate(v || 1);
  window.scrollTo(0, 0);
}
</script>

<template>
  <VPagination
    :length="props.pages"
    :modelValue="+(searchParams.p || 1)"
    @update:modelValue="pageHandle"
  ></VPagination>
</template>
