<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { MovieCard } from "@/entities/movie/ui";
import { searchMovies } from "@/entities/movie/api";
import { useUrlSearchParams } from "@vueuse/core";
import { injectKy } from "@/app/plugins/ky";
const ky = injectKy();

const MOVIE_SUGGESTION = "Order of the Phoenix";

const movies = ref<Awaited<ReturnType<typeof searchMovies>> | undefined>();
function searchHandle(event: KeyboardEvent) {
  const title = (event.target as HTMLInputElement).value;
  params.value.q = title;
  delete params.value.p;
}

const params = ref(useUrlSearchParams("history", { removeFalsyValues: true }));
watch(
  () => params.value,
  async () => {
    movies.value = await searchMovies(ky, params.value.q, params.value.p);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <label class="search">
    <p>
      Search your favorite movies below. Or try searching
      <RouterLink
        :to="{ query: { ...params, q: MOVIE_SUGGESTION } }"
        @click="params.q = MOVIE_SUGGESTION"
      >
        {{ MOVIE_SUGGESTION }}
      </RouterLink>
    </p>
    <input
      v-bind:value="params.q"
      class="search-input"
      type="search"
      placeholder="What are you going to watch tonight?"
      @keyup.enter="searchHandle"
    />
  </label>
  <template v-if="movies?.data">
    <ul>
      <MovieCard v-for="movie in movies.data" :key="String(movie.imdbID)" element="li" :movie />
    </ul>
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul>
        <li v-for="n in movies.total_pages" :key="n">
          <RouterLink
            :to="{ name: 'home', query: { ...params, p: n } }"
            @click="() => (params.p = n)"
          >
            {{ n }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </template>
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
.search-input {
}

ul {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

@keyframes search-scroll-border {
  to {
    border-bottom-color: oklch(85% 0 0);
  }
}
</style>
