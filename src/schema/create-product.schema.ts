import { z } from "zod";
import { decimalStringSchema, productNameToCreateSchema, productUnitToCreateSchema } from "./shared.js";

export const createProductPayloadSchema = z
  .object({
    names: z.array(productNameToCreateSchema).min(1),
    units: z.array(productUnitToCreateSchema).min(1),
    article: z.string().min(1).max(900).nullable().optional(),
    comment: z.string().min(1).max(2000).nullable().optional(),
    amount: decimalStringSchema.nullable().optional()
  })
  .strict();
