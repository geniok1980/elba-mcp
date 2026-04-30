import { z } from "zod";

export const uuidSchema = z.string().uuid();
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected date in YYYY-MM-DD format");
export const decimalStringSchema = z.string().min(1);

export const ndsRateToSaveSchema = z.enum([
  "withoutNds",
  "nds0",
  "nds5",
  "nds10",
  "nds20",
  "nds22"
]);

export const productTypeSchema = z.enum(["product", "service"]);
export const universalTransferDocumentStatusSchema = z.enum(["status1", "status2"]);

export const contractorContactSchema = z
  .object({
    name: z.string().min(1).max(400).nullable().optional(),
    post: z.string().min(1).max(400).nullable().optional(),
    phone: z.string().min(1).max(400).nullable().optional(),
    emails: z.array(z.string().min(1).max(400)).nullable(),
    comment: z.string().min(1).max(400).nullable().optional()
  })
  .strict();

export const productNameToCreateSchema = z
  .object({
    name: z.string().min(1).max(2000),
    isMain: z.boolean()
  })
  .strict();

export const productNameToUpdateSchema = z
  .object({
    id: uuidSchema.nullable().optional(),
    name: z.string().min(1).max(2000),
    isMain: z.boolean()
  })
  .strict();

export const productUnitToCreateSchema = z
  .object({
    isMain: z.boolean(),
    name: z.string().min(1).max(50),
    ratio: decimalStringSchema
  })
  .strict();

export const productUnitToUpdateSchema = z
  .object({
    id: uuidSchema.nullable().optional(),
    isMain: z.boolean(),
    name: z.string().min(1).max(50),
    ratio: z.number().int()
  })
  .strict();

export const searchContractorsFilterSchema = z
  .object({
    inn: z.string().min(10).max(12).nullable().optional(),
    kpp: z.string().min(9).max(9).nullable().optional(),
    name: z.string().min(1).max(400).nullable().optional()
  })
  .strict();

export const searchProductsFilterSchema = z
  .object({
    productName: z.string().min(1).max(2000).nullable().optional(),
    article: z.string().min(1).max(900).nullable().optional()
  })
  .strict();

export const deliveryNoteItemToCreateSchema = z
  .object({
    productName: z.string().min(1).max(2000),
    unitName: z.string().min(1).max(1000),
    quantity: decimalStringSchema,
    price: decimalStringSchema.nullable().optional(),
    ndsRate: ndsRateToSaveSchema.nullable().optional(),
    discount: decimalStringSchema.nullable().optional()
  })
  .strict();

export const billItemToCreateSchema = z
  .object({
    productName: z.string().min(1).max(2000),
    unitName: z.string().min(1).max(1000),
    quantity: decimalStringSchema,
    price: decimalStringSchema.nullable().optional(),
    ndsRate: ndsRateToSaveSchema.nullable().optional(),
    discount: decimalStringSchema.nullable().optional()
  })
  .strict();

export const actItemToCreateSchema = z
  .object({
    productName: z.string().min(1).max(2000),
    unitName: z.string().min(1).max(1000),
    quantity: z.number().nonnegative(),
    price: z.number().nonnegative().nullable().optional(),
    ndsRate: ndsRateToSaveSchema.nullable().optional(),
    discount: z.number().min(0).max(100).nullable().optional()
  })
  .strict();

export const placeholderItemToCreateSchema = z
  .object({
    name: z.string(),
    value: z.string()
  })
  .strict();

export const universalTransferDocumentItemToCreateSchema = z
  .object({
    productName: z.string().min(1).max(2000),
    productType: productTypeSchema,
    unitName: z.string().min(1).max(1000),
    quantity: decimalStringSchema,
    price: decimalStringSchema.nullable().optional(),
    ndsRate: ndsRateToSaveSchema.nullable().optional(),
    rnpt: z.string().min(25).max(29).nullable().optional(),
    originOfProductCountry: z.string().min(1).max(200).nullable().optional(),
    discount: decimalStringSchema.nullable().optional()
  })
  .strict();
