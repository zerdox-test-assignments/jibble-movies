import { describe, beforeEach, test, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSavedMoviesStore } from "./stores";
import type { Movie } from "@/entities/movie/model";
import { randMovie, randPastDate } from "@ngneat/falso";
import { nanoid } from "nanoid";

describe("useSavedMoviesStore", () => {
  // Create fresh pinia for each test
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  const generateMovie = (): Movie => ({
    Title: randMovie(),
    Year: randPastDate().getFullYear(),
    imdbID: nanoid(),
  });

  test("initializes with empty value", () => {
    const store = useSavedMoviesStore();
    expect(store.movies).toEqual([]);
  });

  test("can add and remove a movie", () => {
    const store = useSavedMoviesStore();
    const movie1 = generateMovie();
    const movie2 = generateMovie();

    store.add(movie1);
    expect(store.movies).toHaveLength(1);
    expect(store.movies).toEqual([movie1]);

    store.add(movie2);
    expect(store.movies).toHaveLength(2);

    store.remove(movie1.imdbID);
    expect(store.movies).toHaveLength(1);
    expect(store.movies).toEqual([movie2]);
  });

  test("does nothing when removing non-existent movie", () => {
    const store = useSavedMoviesStore();
    const movie = generateMovie();
    store.add(movie);

    store.remove("non-existent-id");
    expect(store.movies).toEqual([movie]);
  });
});
