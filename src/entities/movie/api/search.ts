import { type KyInstance } from "ky";
import { type Movie } from "@/entities/movie/model";
import { type DataPaginated } from "@/shared/api/types";

export async function search(
  ky: KyInstance,
  title: Movie["Title"],
  page: DataPaginated["page"] = 1,
) {
  const res = await ky
    .get(`movies/search`, {
      searchParams: { title, page },
    })
    .json<DataPaginated<Movie>>();
  return res;
}
