import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { searchProductsPayloadSchema } from "../schema/search-products.schema.js";

export const elbaSearchProductsTool = {
  name: "elba_search_products",
  description: "Search products.",
  inputSchema: {
    organization_id: z.string(),
    payload: searchProductsPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof searchProductsPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/products/search`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
