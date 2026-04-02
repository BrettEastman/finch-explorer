import type { ApiError } from "@/lib/types";

export function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    (data as ApiError).error === true
  );
}

export function isFinchNotImplemented(err: unknown): boolean {
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.status === 501) return true;
    if (typeof e.message === "string" && e.message.toLowerCase().includes("not implemented"))
      return true;
  }
  return false;
}
