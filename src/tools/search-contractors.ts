import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { searchContractorsPayloadSchema } from "../schema/search-contractors.schema.js";

export const elbaSearchContractorsTool = {
  name: "elba_search_contractors",
  description: "Search contractors.",
  inputSchema: {
    organization_id: z.string(),
    payload: searchContractorsPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof searchContractorsPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/contractors/search`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
