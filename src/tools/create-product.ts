import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createProductPayloadSchema } from "../schema/create-product.schema.js";

export const elbaCreateProductTool = {
  name: "elba_create_product",
  description: "Create product.",
  inputSchema: {
    organization_id: z.string(),
    payload: createProductPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createProductPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/products`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
