import { describe, test, expect, vi, beforeEach } from "vitest";
import { search } from "@/entities/movie/api/search";
import type { KyInstance } from "ky";
import type { Movie } from "@/entities/movie/model";
import type { DataPaginated } from "@/shared/api/types";

const mockKy = {
  get: vi.fn(() => ({
    json: vi.fn(),
  })),
} as unknown as KyInstance;

describe("movies API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockResponse: DataPaginated<Movie> = {
    data: [{ imdbID: "1", Title: "Test", Year: 2023 }],
    total: 1,
    total_pages: 1,
    page: 1,
    per_page: 1,
  };

  test("calls correct endpoint with params", async () => {
    vi.mocked(mockKy.get).mockReturnValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const result = await search(mockKy, "Inception", 2);

    // Verify URL and params
    expect(mockKy.get).toHaveBeenCalledWith("movies/search", {
      searchParams: {
        Title: "Inception",
        page: 2,
      },
    });

    // Verify response handling
    expect(result).toEqual(mockResponse);
  });

  test("handles empty title", async () => {
    vi.mocked(mockKy.get).mockReturnValueOnce({
      json: vi
        .fn()
        .mockResolvedValueOnce({ data: [], total_pages: 0, page: 0, per_page: 0, total: 0 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await search(mockKy, "", 1);
    expect(mockKy.get).toHaveBeenCalledWith("movies/search", {
      searchParams: {
        Title: "",
        page: 1,
      },
    });
  });

  test("throws on invalid response structure", async () => {
    vi.mocked(mockKy.get).mockReturnValueOnce({
      json: vi.fn().mockResolvedValueOnce({ invalid: "structure" }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await expect(search(mockKy, "test")).rejects.toThrow();
  });
});
