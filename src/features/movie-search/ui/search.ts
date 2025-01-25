import { useUrlSearchParams } from "@vueuse/core";

export type QueryParams = {
  q?: string; // Search query term
  p?: string; // Pagination page number
};

/**
 * Manages movie search parameters and binds them to the URL
 */
const searchParams = useUrlSearchParams<QueryParams>("history", { removeFalsyValues: true });

/**
 * Returns an object containing methods to handle movie search and pagination
 */
export function useMoviesSearch() {
  /**
   * Searches movies based on the query term
   * @param q The search query string
   */
  function search(query: string) {
    searchParams.q = query;
    if (searchParams.p) delete searchParams.p;
  }

  /**
   * Handles pagination of movie results
   * @param p The current page number
   */
  function paginate(page: number) {
    searchParams.p = String(page);
  }

  return { searchParams, search, paginate };
}
