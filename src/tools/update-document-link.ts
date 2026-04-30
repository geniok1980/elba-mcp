import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { updateDocumentLinkPayloadSchema } from "../schema/update-document-link.schema.js";

export const elbaUpdateDocumentLinkTool = {
  name: "elba_update_document_link",
  description: "Update document publication context.",
  inputSchema: {
    organization_id: z.string(),
    link_id: z.string(),
    payload: updateDocumentLinkPayloadSchema
  },
  cb: async ({
    organization_id,
    link_id,
    payload
  }: {
    organization_id: string;
    link_id: string;
    payload: z.infer<typeof updateDocumentLinkPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "PUT",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-links/${encodeURIComponent(link_id)}`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
