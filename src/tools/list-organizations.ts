import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaListOrganizationsTool = {
  name: "elba_list_organizations",
  description: "Get organizations available for the current Elba API key.",
  inputSchema: {
    offset: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).max(100).optional()
  },
  cb: async ({ offset, limit }: { offset?: number; limit?: number }) => {
    const data = await elbaRequest("GET", "/v1/organizations", {
      query: { offset, limit }
    });
    return mcpResponse(data);
  }
};
