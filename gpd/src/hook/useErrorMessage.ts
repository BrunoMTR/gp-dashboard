// src/hooks/useErrorMessage.ts
import { AxiosError } from "axios";

export function useErrorMessage(error: unknown): string {
  if (!error) return "";

  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
