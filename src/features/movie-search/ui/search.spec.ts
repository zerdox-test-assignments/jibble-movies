import { describe, test, expect } from "vitest";
import { useMoviesSearch, type QueryParams } from "./search";
import { randMovie, randNumber } from "@ngneat/falso";

describe("useMoviesSearch", () => {
  test("search() after paginate() clears existing page number", () => {
    const { search, paginate, searchParams } = useMoviesSearch();
    const query = randMovie();
    const pageNumber = randNumber();

    paginate(pageNumber);
    expect(searchParams.p).toBe(String(pageNumber));

    search(query);
    expect(searchParams).toEqual({ q: query, p: undefined } satisfies QueryParams);
  });

  test("handles empty query", () => {
    const { search, searchParams } = useMoviesSearch();
    search("");
    expect(searchParams).toEqual({
      q: "",
      p: undefined,
    } satisfies QueryParams);
  });
});
