<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useMoviesSearch } from "@/features/movie-search/ui";

const MOVIE_SUGGESTION = "Order of the Phoenix";

const route = useRoute();
const { searchParams, search } = useMoviesSearch();
const inputSearchValue = ref(searchParams.q ?? "");
</script>

<template>
  <label class="search">
    <p>
      Search your favorite movies below. Or try searching
      <RouterLink
        :to="{
          query: {
            ...route.query,
            p: undefined,
            q: MOVIE_SUGGESTION,
          },
        }"
        @click="() => search(MOVIE_SUGGESTION)"
      >
        {{ MOVIE_SUGGESTION }}
      </RouterLink>
    </p>
    <div class="search__bar">
      <input
        :value="searchParams.q"
        @input="(event) => (inputSearchValue = (event.target as HTMLInputElement).value)"
        class="search__input"
        type="search"
        name="query"
        placeholder="What are you going to watch tonight?"
        @keyup.enter="() => search(inputSearchValue)"
      />
      <button @click="() => search(inputSearchValue)" type="button" class="search__button">
        Search
      </button>
    </div>
  </label>
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
  border: 1px solid oklch(20% 0 0);
  padding: 2px 6px;
  border-radius: 4px;
}
.search__button {
  border: 1px solid oklch(20% 0 0);
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.search__button:hover {
  background-color: oklch(85% 0 0);
}

@keyframes search-scroll-border {
  to {
    border-bottom-color: oklch(85% 0 0);
  }
}
</style>
