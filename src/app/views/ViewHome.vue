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

const params = ref(
  useUrlSearchParams<{
    q?: string;
    p?: string;
  }>("history", { removeFalsyValues: true }),
);
watch(
  () => params.value,
  async () => {
    movies.value = await searchMovies(ky, params.value.q, +(params.value.p ?? 1));
  },
  { immediate: true, deep: true },
);

const inputSearchValue = ref(params.value.q ?? "");
function triggerSearch(title: string) {
  params.value.q = title;
  delete params.value.p;
}
</script>

<template>
  <label class="search">
    <p>
      Search your favorite movies below. Or try searching
      <RouterLink
        :to="{ query: { ...params, p: undefined, q: MOVIE_SUGGESTION } }"
        @click="() => triggerSearch(MOVIE_SUGGESTION)"
      >
        {{ MOVIE_SUGGESTION }}
      </RouterLink>
    </p>
    <div class="search__bar">
      <input
        :value="params.q"
        @input="(event) => (inputSearchValue = (event.target as HTMLInputElement).value)"
        class="search__input"
        type="search"
        name="query"
        placeholder="What are you going to watch tonight?"
        @keyup.enter="() => triggerSearch(inputSearchValue)"
      />
      <button @click="() => triggerSearch(inputSearchValue)" type="button" class="search__button">
        Search
      </button>
    </div>
  </label>
  <template v-if="movies?.data">
    <ul>
      <MovieCard v-for="movie in movies.data" :key="String(movie.imdbID)" element="li" :movie />
    </ul>
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul>
        <li v-for="n in movies.total_pages" :key="n">
          <RouterLink
            :aria-current="+(params.p ?? 1) === n ? 'page' : undefined"
            :aria-label="`Goto Page ${n}`"
            :to="{ name: 'home', query: { ...params, p: n } }"
            @click="() => (params.p = n.toString())"
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
.search__bar {
  display: flex;
  gap: 6px;
}
.search__input {
  flex-grow: 1;
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
