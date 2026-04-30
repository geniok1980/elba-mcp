import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaListDocumentTemplatesTool = {
  name: "elba_list_document_templates",
  description: "List available document templates.",
  inputSchema: {
    organization_id: z.string(),
    offset: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).max(100).optional()
  },
  cb: async ({
    organization_id,
    offset,
    limit
  }: {
    organization_id: string;
    offset?: number;
    limit?: number;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-templates`,
      { query: { offset, limit } }
    );
    return mcpResponse(data);
  }
};
