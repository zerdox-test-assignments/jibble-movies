<script setup lang="ts">
import { useId, type Component } from "vue";
import { type Movie } from "@/entities/movie/model";

const props = defineProps<{
  element?: string | Component;
  movie: Movie;
}>();

const id = useId();

function btnSaveHandle(event: Event, movie: Movie) {
  console.log({ event, movie });
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
      @click="(event) => btnSaveHandle(event, props.movie)"
      :id="id"
      class="button-save"
      type="button"
    >
      <span>Save</span>
      <svg class="icon" width="26" height="26" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-width="2"
          d="M11.08 5.1a1 1 0 0 1 1.84 0l1.75 4.03a1 1 0 0 0 .84.6l4.46.34a1 1 0 0 1 .56 1.77l-3.33 2.72a1 1 0 0 0-.34 1.02l1.03 4.11a1 1 0 0 1-1.47 1.11l-3.92-2.28a1 1 0 0 0-1 0L7.58 20.8a1 1 0 0 1-1.47-1.1l1.03-4.13a1 1 0 0 0-.34-1.01l-3.33-2.72a1 1 0 0 1 .56-1.77l4.46-.35a1 1 0 0 0 .84-.6l1.75-4.02Z"
        />
      </svg>
    </button>
  </component>
</template>

<style scoped lang="scss">
.movie {
  border: 1px solid oklch(50% 0 0);
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  label {
    cursor: pointer;
  }
  .button-save {
    display: flex;
    gap: 6px;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    &:hover .icon path {
      fill: oklch(0% 0 0);
    }
    .icon {
      --size: 26px;
      width: var(--size);
      height: var(--size);
    }
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
}
</style>
