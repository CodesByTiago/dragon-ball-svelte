import axios from "axios";

export class ApiError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return new ApiError(error.message, error.response?.status, error.code);
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("An unexpected API error occurred");
}

export const http = axios.create({
  baseURL: "https://dragonball-api.com/api",
  timeout: 10_000,
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizeApiError(error)),
);
