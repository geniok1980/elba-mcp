import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createUniversalTransferDocumentPayloadSchema } from "../schema/create-universal-transfer-document.schema.js";

export const elbaCreateUniversalTransferDocumentTool = {
  name: "elba_create_universal_transfer_document",
  description: "Create outgoing universal transfer document.",
  inputSchema: {
    organization_id: z.string(),
    payload: createUniversalTransferDocumentPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createUniversalTransferDocumentPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/universal-transfer-documents`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
