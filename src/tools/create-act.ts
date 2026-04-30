import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createActPayloadSchema } from "../schema/create-act.schema.js";

export const elbaCreateActTool = {
  name: "elba_create_act",
  description: "Create outgoing act.",
  inputSchema: {
    organization_id: z.string(),
    payload: createActPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createActPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/acts`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
