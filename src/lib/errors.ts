export function isFinchNotImplemented(err: unknown): boolean {
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.status === 501) return true;
    if (typeof e.message === "string" && e.message.toLowerCase().includes("not implemented"))
      return true;
  }
  return false;
}
