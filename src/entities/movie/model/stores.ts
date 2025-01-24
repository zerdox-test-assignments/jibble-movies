import { defineStore } from "pinia";
import { ref } from "vue";
import { type Movie } from "@/entities/movie/model";

export const useSavedMoviesStore = defineStore(
  "saved-movies",
  () => {
    const movies = ref<Movie[]>([]);

    function add(movie: Movie) {
      movies.value.push(movie);
    }
    function remove(id: Movie["imdbID"]) {
      movies.value = movies.value.filter((movie) => movie.imdbID !== id);
    }

    return { movies, add, remove };
  },
  {
    persist: true,
  },
);
