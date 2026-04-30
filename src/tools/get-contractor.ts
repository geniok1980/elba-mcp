import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetContractorTool = {
  name: "elba_get_contractor",
  description: "Get contractor by id.",
  inputSchema: {
    organization_id: z.string(),
    contractor_id: z.string()
  },
  cb: async ({
    organization_id,
    contractor_id
  }: {
    organization_id: string;
    contractor_id: string;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/contractors/${encodeURIComponent(contractor_id)}`
    );
    return mcpResponse(data);
  }
};
