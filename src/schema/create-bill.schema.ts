import { z } from "zod";
import { billItemToCreateSchema, dateSchema, placeholderItemToCreateSchema, uuidSchema } from "./shared.js";

export const createBillPayloadSchema = z
  .object({
    number: z.string().min(1).max(30).nullable().optional(),
    date: dateSchema,
    withNDS: z.boolean().nullable().optional(),
    comment: z.string().min(1).max(10000).nullable().optional(),
    bankAccountId: uuidSchema.nullable().optional(),
    contractorId: uuidSchema.nullable().optional(),
    sumsWithNDS: z.boolean().nullable().optional(),
    withDiscount: z.boolean().nullable().optional(),
    templateId: uuidSchema.nullable().optional(),
    placeholderItems: z.array(placeholderItemToCreateSchema).nullable().optional(),
    warehouseItems: z.array(billItemToCreateSchema).nullable().optional()
  })
  .strict();
