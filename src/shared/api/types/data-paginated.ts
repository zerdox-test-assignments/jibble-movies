export type DataPaginated<T = unknown> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [T];
};
