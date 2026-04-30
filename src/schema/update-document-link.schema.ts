import { z } from "zod";

export const updateDocumentLinkPayloadSchema = z
  .object({
    isPublished: z.boolean(),
    withSignatures: z.boolean(),
    isQrCodeEnabled: z.boolean()
  })
  .strict();
