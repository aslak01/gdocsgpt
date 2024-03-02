export function extractError(error: unknown): string {
  return error && typeof error === "object" && "message" in error &&
    typeof error.message === "string"
    ? error.message
    : String(error);
}
