import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetDocumentTemplateTool = {
  name: "elba_get_document_template",
  description: "Get document template by id.",
  inputSchema: {
    organization_id: z.string(),
    template_id: z.string()
  },
  cb: async ({
    organization_id,
    template_id
  }: {
    organization_id: string;
    template_id: string;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-templates/${encodeURIComponent(template_id)}`
    );
    return mcpResponse(data);
  }
};
