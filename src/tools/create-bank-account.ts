import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createBankAccountPayloadSchema } from "../schema/create-bank-account.schema.js";

export const elbaCreateBankAccountTool = {
  name: "elba_create_bank_account",
  description: "Create organization bank account.",
  inputSchema: {
    organization_id: z.string(),
    payload: createBankAccountPayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createBankAccountPayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/bank-accounts`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
