import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createBillPayloadSchema } from "../schema/create-bill.schema.js";

export const elbaCreateBillTool = {
  name: "elba_create_bill",
  description: "Create outgoing bill.",
  inputSchema: {
    organization_id: z.string(),
    payload: createBillPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createBillPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/bills`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
