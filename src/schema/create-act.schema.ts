import { z } from "zod";
import { actItemToCreateSchema, dateSchema, placeholderItemToCreateSchema, uuidSchema } from "./shared.js";

export const createActPayloadSchema = z
  .object({
    number: z.string().min(1).max(30).nullable().optional(),
    date: dateSchema,
    withNDS: z.boolean().nullable().optional(),
    reasonName: z.string().min(1).max(10000).nullable().optional(),
    reasonNumber: z.string().nullable().optional(),
    comment: z.string().min(1).max(10000).nullable().optional(),
    reasonDate: dateSchema.nullable().optional(),
    bankAccountId: uuidSchema.nullable().optional(),
    contractorId: uuidSchema.nullable().optional(),
    sumsWithNDS: z.boolean().nullable().optional(),
    withDiscount: z.boolean().nullable().optional(),
    templateId: uuidSchema.nullable().optional(),
    placeholderItems: z.array(placeholderItemToCreateSchema).nullable().optional(),
    warehouseItems: z.array(actItemToCreateSchema).nullable().optional()
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.withNDS !== false || !value.warehouseItems) return;
    value.warehouseItems.forEach((item, index) => {
      if (item.ndsRate !== null && item.ndsRate !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["warehouseItems", index, "ndsRate"],
          message: "When withNDS is false, ndsRate must be null."
        });
      }
    });
  });
