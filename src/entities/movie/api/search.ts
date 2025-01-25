import { type KyInstance } from "ky";
import { type Movie } from "@/entities/movie/model";
import { type DataPaginated } from "@/shared/api/types";

export async function search(
  ky: KyInstance,
  title: Movie["Title"] = "",
  page: DataPaginated["page"] = 1,
) {
  const res = await ky
    .get(`movies/search`, {
      searchParams: JSON.parse(
        JSON.stringify({
          Title: title,
          page,
        }),
      ),
    })
    .json<DataPaginated<Movie>>();

  /* better use zod here */
  const responseIsInvalid = ["total_pages", "data", "page", "total"].some(
    (prop) => !res.hasOwnProperty(prop),
  );
  if (responseIsInvalid) throw new Error("Invalid API response structure");

  return res;
}
