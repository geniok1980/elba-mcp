import { z } from "zod";

export const createBankAccountPayloadSchema = z
  .object({
    accountNumber: z.string().min(20).max(20),
    bik: z.string().min(9).max(9)
  })
  .strict();
