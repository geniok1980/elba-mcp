import { z } from "zod";
import { uuidSchema } from "./shared.js";

export const createDocumentLinkPayloadSchema = z
  .object({
    documentId: uuidSchema,
    published: z.boolean(),
    withSignatures: z.boolean(),
    isQrCodeEnabled: z.boolean()
  })
  .strict();
