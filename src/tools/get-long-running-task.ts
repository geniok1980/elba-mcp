import { z } from "zod";
import { mcpResponse } from "../mcp-response.js";
import { elbaRequest } from "../elba-request.js";

export const elbaGetLongRunningTaskTool = {
  name: "elba_get_long_running_task",
  description: "Get status/result of a long-running Elba API operation.",
  inputSchema: {
    task_id: z.string().describe("Long-running task id.")
  },
  cb: async ({ task_id }: { task_id: string }) => {
    const data = await elbaRequest(
      "GET",
      `/v1/long-running-tasks/${encodeURIComponent(task_id)}`
    );
    return mcpResponse(data);
  }
};
