import { z } from "zod";
import { contractorContactSchema } from "./shared.js";

export const createContractorPayloadSchema = z
  .object({
    name: z.string().min(1).max(400),
    inn: z.string().min(10).max(12).nullable().optional(),
    kpp: z.string().min(9).max(9).nullable().optional(),
    shortName: z.string().min(1).max(400).nullable().optional(),
    address: z.string().min(1).max(2000).nullable().optional(),
    postAddress: z.string().min(1).max(2000).nullable().optional(),
    okpo: z.string().min(8).max(10).nullable().optional(),
    ogrn: z.string().min(13).max(15).nullable().optional(),
    contacts: z.array(contractorContactSchema).nullable().optional()
  })
  .strict();
