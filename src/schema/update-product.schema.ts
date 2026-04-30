import { z } from "zod";
import { productNameToUpdateSchema, productUnitToUpdateSchema } from "./shared.js";

export const updateProductPayloadSchema = z
  .object({
    names: z.array(productNameToUpdateSchema).min(1),
    units: z.array(productUnitToUpdateSchema).min(1),
    article: z.string().min(1).max(900).nullable().optional(),
    comment: z.string().min(1).max(2000).nullable().optional()
  })
  .strict();
