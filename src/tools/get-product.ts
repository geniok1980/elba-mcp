import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetProductTool = {
  name: "elba_get_product",
  description: "Get product by id.",
  inputSchema: {
    organization_id: z.string(),
    product_id: z.string()
  },
  cb: async ({
    organization_id,
    product_id
  }: {
    organization_id: string;
    product_id: string;
  }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/organizations/${encodeURIComponent(organization_id)}/products/${encodeURIComponent(product_id)}`
    );
    return mcpResponse(data);
  }
};
