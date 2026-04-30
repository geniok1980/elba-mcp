import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaSubscribeDocumentNewsTool = {
  name: "elba_subscribe_document_news",
  description: "Subscribe to document news.",
  inputSchema: {
    organization_id: z.string()
  },
  cb: async ({ organization_id }: { organization_id: string }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/document-news/subscription`
    );
    return mcpResponse(data);
  }
};
