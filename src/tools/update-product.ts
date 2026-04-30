import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { updateProductPayloadSchema } from "../schema/update-product.schema.js";

export const elbaUpdateProductTool = {
  name: "elba_update_product",
  description: "Update product.",
  inputSchema: {
    organization_id: z.string(),
    product_id: z.string(),
    payload: updateProductPayloadSchema
  },
  cb: async ({
    organization_id,
    product_id,
    payload
  }: {
    organization_id: string;
    product_id: string;
    payload: z.infer<typeof updateProductPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/products/${encodeURIComponent(product_id)}/update`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
