<script setup lang="ts">
const props = defineProps<{
  pages?: number;
}>();

import { defineProps } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useMoviesSearch } from "@/features/movie/ui";

const { params, page } = useMoviesSearch();
const route = useRoute();
</script>

<template>
  <nav role="navigation" aria-label="Pagination Navigation">
    <ul>
      <li v-for="pageNumber in props.pages" :key="pageNumber">
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
