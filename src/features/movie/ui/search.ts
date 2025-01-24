import { useUrlSearchParams } from "@vueuse/core";

export type QueryParams = {
  q?: string;
  p?: string;
};

const params = useUrlSearchParams<QueryParams>("history", { removeFalsyValues: true });

export function useMoviesSearch() {
  function query(q: string) {
    params.q = q;
    delete params.p;
  }

  function page(p: number) {
    params.p = p.toString();
  }

  return { params, query, page };
}
