export function logError(error: any): string {
  return error && typeof error.message === "string"
    ? error.message
    : String(error);
}
