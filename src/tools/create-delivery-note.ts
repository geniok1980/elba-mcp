import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";
import { createDeliveryNotePayloadSchema } from "../schema/create-delivery-note.schema.js";

export const elbaCreateDeliveryNoteTool = {
  name: "elba_create_delivery_note",
  description: "Create outgoing delivery note.",
  inputSchema: {
    organization_id: z.string(),
    payload: createDeliveryNotePayloadSchema
  },
  cb: async ({
    organization_id,
    payload
  }: {
    organization_id: string;
    payload: z.infer<typeof createDeliveryNotePayloadSchema>;
  }) => {
    const data = await elbaRequest(
      "POST",
      `/v1/organizations/${encodeURIComponent(organization_id)}/delivery-notes`,
      { body: payload }
    );
    return mcpResponse(data);
  }
};
