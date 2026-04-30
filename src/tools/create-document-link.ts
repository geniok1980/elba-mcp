import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createDocumentLinkPayloadSchema } from "../schema/create-document-link.schema.js";

export const elbaCreateDocumentLinkTool = {
  name: "elba_create_document_link",
  description: "Create document publication context.",
  inputSchema: {
    organization_id: z.string(),
    payload: createDocumentLinkPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createDocumentLinkPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-links`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
