<script setup lang="ts">
const props = defineProps<{
  pages?: number;
}>();

import { defineProps } from "vue";
import { useMoviesSearch } from "@/features/movie/ui";
import { VPagination } from "vuetify/components/VPagination";
const { params, page } = useMoviesSearch();

function pageHandle(v: number) {
  page(v || 1);
  window.scrollTo(0, 0);
}
</script>

<template>
  <VPagination
    :length="props.pages"
    :modelValue="+(params.p || 1)"
    @update:modelValue="pageHandle"
  ></VPagination>
</template>
