import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRegisterTool } from "./tools/register-tool.js";
import { elbaCreateActTool } from "./tools/create-act.js";
import { elbaCreateBankAccountTool } from "./tools/create-bank-account.js";
import { elbaCreateBillTool } from "./tools/create-bill.js";
import { elbaCreateContractorTool } from "./tools/create-contractor.js";
import { elbaCreateDeliveryNoteTool } from "./tools/create-delivery-note.js";
import { elbaCreateDocumentLinkTool } from "./tools/create-document-link.js";
import { elbaCreateProductTool } from "./tools/create-product.js";
import { elbaCreateUniversalTransferDocumentTool } from "./tools/create-universal-transfer-document.js";
import { elbaDeleteDocumentLinkTool } from "./tools/delete-document-link.js";
import { elbaGetBillTool } from "./tools/get-bill.js";
import { elbaGetContractorTool } from "./tools/get-contractor.js";
import { elbaGetDocumentLinkTool } from "./tools/get-document-link.js";
import { elbaGetDocumentTemplateTool } from "./tools/get-document-template.js";
import { elbaGetProductTool } from "./tools/get-product.js";
import { elbaListOrganizationsTool } from "./tools/list-organizations.js";
import { elbaGetLongRunningTaskTool } from "./tools/get-long-running-task.js";
import { elbaListBankAccountsTool } from "./tools/list-bank-accounts.js";
import { elbaListDocumentNewsTool } from "./tools/list-document-news.js";
import { elbaListDocumentTemplatesTool } from "./tools/list-document-templates.js";
import { elbaSearchContractorsTool } from "./tools/search-contractors.js";
import { elbaSearchProductsTool } from "./tools/search-products.js";
import { elbaSubscribeDocumentNewsTool } from "./tools/subscribe-document-news.js";
import { elbaUpdateDocumentLinkTool } from "./tools/update-document-link.js";
import { elbaUpdateProductTool } from "./tools/update-product.js";

const server = new McpServer({
  name: "elba-mcp-server",
  version: "0.1.0"
});

const registerTool = createRegisterTool(server);

const tools = [
  elbaListOrganizationsTool,
  elbaListBankAccountsTool,
  elbaCreateBankAccountTool,
  elbaCreateContractorTool,
  elbaGetContractorTool,
  elbaSearchContractorsTool,
  elbaCreateProductTool,
  elbaUpdateProductTool,
  elbaGetProductTool,
  elbaSearchProductsTool,
  elbaListDocumentNewsTool,
  elbaSubscribeDocumentNewsTool,
  elbaCreateUniversalTransferDocumentTool,
  elbaCreateDeliveryNoteTool,
  elbaCreateBillTool,
  elbaGetBillTool,
  elbaCreateActTool,
  elbaGetLongRunningTaskTool,
  elbaCreateDocumentLinkTool,
  elbaUpdateDocumentLinkTool,
  elbaGetDocumentLinkTool,
  elbaDeleteDocumentLinkTool,
  elbaListDocumentTemplatesTool,
  elbaGetDocumentTemplateTool,
];

for (const tool of tools) {
  registerTool(tool.name, tool.description, tool.inputSchema, tool.cb);
}

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

await main();
