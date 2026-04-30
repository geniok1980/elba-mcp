import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetDocumentLinkTool = {
  name: "elba_get_document_link",
  description: "Get document link.",
  inputSchema: {
    organization_id: z.string(),
    link_id: z.string()
  },
  cb: async ({
    organization_id,
    link_id
  }: {
    organization_id: string;
    link_id: string;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-links/${encodeURIComponent(link_id)}`
    );
    return mcpResponse(data);
  }
};
