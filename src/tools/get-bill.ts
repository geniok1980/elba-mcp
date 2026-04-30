import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetBillTool = {
  name: "elba_get_bill",
  description: "Get outgoing bill by id.",
  inputSchema: {
    organization_id: z.string(),
    bill_id: z.string()
  },
  cb: async ({
    organization_id,
    bill_id
  }: {
    organization_id: string;
    bill_id: string;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/bills/${encodeURIComponent(bill_id)}`
    );
    return mcpResponse(data);
  }
};
