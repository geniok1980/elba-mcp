import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createContractorPayloadSchema } from "../schema/create-contractor.schema.js";

export const elbaCreateContractorTool = {
  name: "elba_create_contractor",
  description: "Create contractor.",
  inputSchema: {
    organization_id: z.string(),
    payload: createContractorPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createContractorPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/contractors`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
