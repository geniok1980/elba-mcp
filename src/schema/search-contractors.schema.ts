import { z } from "zod";
import { searchContractorsFilterSchema } from "./shared.js";

export const searchContractorsPayloadSchema = z
  .object({
    offset: z.number().int().min(0).nullable().optional(),
    limit: z.number().int().min(1).max(100).nullable().optional(),
    filter: searchContractorsFilterSchema.nullable().optional()
  })
  .strict();
