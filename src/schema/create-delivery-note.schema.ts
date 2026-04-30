import { z } from "zod";
import { dateSchema, deliveryNoteItemToCreateSchema, uuidSchema } from "./shared.js";

export const createDeliveryNotePayloadSchema = z
  .object({
    number: z.string().min(1).max(30).nullable().optional(),
    date: dateSchema,
    withNDS: z.boolean().nullable().optional(),
    bankAccountId: uuidSchema.nullable().optional(),
    contractorId: uuidSchema.nullable().optional(),
    sumsWithNDS: z.boolean().nullable().optional(),
    consigneeId: uuidSchema.nullable().optional(),
    reasonName: z.string().min(1).max(10000).nullable().optional(),
    reasonNumber: z.string().nullable().optional(),
    reasonDate: dateSchema.nullable().optional(),
    withDiscount: z.boolean().nullable().optional(),
    warehouseItems: z.array(deliveryNoteItemToCreateSchema).nullable().optional()
  })
  .strict();
