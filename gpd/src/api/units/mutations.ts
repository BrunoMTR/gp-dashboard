import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { createUnit } from "../../../src/services/unit.service";
import type { Unit } from "../units/types";

export function useCreateUnit(): UseMutationResult<Unit, Error, Unit> {
  return useMutation<Unit, Error, Unit>({
    mutationFn: (data: Unit) => createUnit(data),
  });
}

