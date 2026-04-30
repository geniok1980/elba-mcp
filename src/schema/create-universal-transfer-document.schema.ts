import { z } from "zod";
import {
  dateSchema,
  universalTransferDocumentItemToCreateSchema,
  universalTransferDocumentStatusSchema,
  uuidSchema
} from "./shared.js";

export const createUniversalTransferDocumentPayloadSchema = z
  .object({
    number: z.string().min(1).max(30).nullable().optional(),
    date: dateSchema,
    bankAccountId: uuidSchema.nullable().optional(),
    contractorId: uuidSchema.nullable().optional(),
    sumsWithNDS: z.boolean().nullable().optional(),
    consigneeId: uuidSchema.nullable().optional(),
    withProductTracing: z.boolean().nullable().optional(),
    status: universalTransferDocumentStatusSchema,
    stateContractIdentifier: z.string().min(1).max(300).nullable().optional(),
    reasonName: z.string().min(1).max(10000).nullable().optional(),
    reasonNumber: z.string().nullable().optional(),
    reasonDate: dateSchema.nullable().optional(),
    withDiscount: z.boolean().nullable().optional(),
    warehouseItems: z.array(universalTransferDocumentItemToCreateSchema).nullable().optional()
  })
  .strict();
