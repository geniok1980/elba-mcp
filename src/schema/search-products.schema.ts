import { z } from "zod";
import { searchProductsFilterSchema } from "./shared.js";

export const searchProductsPayloadSchema = z
  .object({
    offset: z.number().int().min(0).nullable().optional(),
    limit: z.number().int().min(1).max(100).nullable().optional(),
    filter: searchProductsFilterSchema.nullable().optional()
  })
  .strict();
