<script setup lang="ts">
const props = defineProps<{
  element?: string | Component;
  movie: Movie;
}>();

import { useId, computed, type Component } from "vue";
import { useSavedMoviesStore, type Movie } from "@/entities/movie/model";
const savedMoviesStore = useSavedMoviesStore();

const id = useId();
const movieIsSaved = computed(() =>
  savedMoviesStore.movies.some((movie) => movie.imdbID === props.movie.imdbID),
);

function saveBtnHandle() {
  if (movieIsSaved.value) {
    savedMoviesStore.remove(props.movie.imdbID);
  } else {
    savedMoviesStore.add(props.movie);
  }
}
</script>

<template>
  <component class="movie" :is="props.element ?? 'div'">
    <label :for="id">
      <p class="title">{{ props.movie.Title }}</p>
    </label>
    <dl class="properties">
      <dt>Year:</dt>
      <dd>{{ props.movie.Year }}</dd>
      <dt>IMDB ID:</dt>
      <dd>{{ props.movie.imdbID }}</dd>
    </dl>
    <button
      @click="saveBtnHandle"
      :id="id"
      class="button-save"
      type="button"
      :data-active="movieIsSaved"
    >
      <svg class="icon" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-width="2"
          d="M11.08 5.1a1 1 0 0 1 1.84 0l1.75 4.03a1 1 0 0 0 .84.6l4.46.34a1 1 0 0 1 .56 1.77l-3.33 2.72a1 1 0 0 0-.34 1.02l1.03 4.11a1 1 0 0 1-1.47 1.11l-3.92-2.28a1 1 0 0 0-1 0L7.58 20.8a1 1 0 0 1-1.47-1.1l1.03-4.13a1 1 0 0 0-.34-1.01l-3.33-2.72a1 1 0 0 1 .56-1.77l4.46-.35a1 1 0 0 0 .84-.6l1.75-4.02Z"
        />
      </svg>
      <span>{{ movieIsSaved ? "Saved!" : "Save" }}</span>
    </button>
  </component>
</template>

<style scoped lang="scss">
.movie {
  border: 1px solid oklch(50% 0 0);
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
}

label {
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: 500;
}

.properties {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 3px 12px;
  dt {
    grid-column-start: 1;
  }
  dd {
    grid-column-start: 2;
  }
}

.button-save {
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid oklch(50% 0 0);
  border-radius: 6px;
  padding: 4px 12px 4px 8px;
  .icon {
    --icon-size: 24px;
    --icon-color: oklch(100% 0 0);
    width: var(--icon-size);
    height: var(--icon-size);
    margin-top: -2px;
    path {
      fill: var(--icon-color);
      transition: fill 0.25s;
    }
  }
  &:hover,
  &[data-active="true"] {
    .icon {
      --icon-color: oklch(0% 0 0);
    }
  }
}
</style>
