# Elba MCP Server

MCP server that exposes Kontur Elba Public API as MCP tools.

- Docs: `https://developer.kontur.ru/doc/elba.public.api`
- OpenAPI: `https://elba-api.kontur.ru/swagger/v1/swagger.json`
- Base API host: `https://elba-api.kontur.ru`

## Required Environment Variables

- `ELBA_API_KEY` — value for `X-Kontur-ApiKey` header.
  - Example: `ELBA_API_KEY=your_elba_api_key`
  - No other env vars are required.

## Docker Usage (Build Locally)

```bash
docker build -t elba-mcp:latest .
docker run --rm -i \
  -e ELBA_API_KEY="your_api_key" \
  elba-mcp:latest
```

## Claude Desktop Config (Local Image)

```json
{
  "mcpServers": {
    "elba": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "ELBA_API_KEY=your_api_key",
        "elba-mcp:latest"
      ]
    }
  }
}
```

## Tools

- `elba_list_organizations`
- `elba_list_bank_accounts`
- `elba_create_bank_account`
- `elba_create_contractor`
- `elba_get_contractor`
- `elba_search_contractors`
- `elba_create_product`
- `elba_update_product`
- `elba_get_product`
- `elba_search_products`
- `elba_list_document_news`
- `elba_subscribe_document_news`
- `elba_create_universal_transfer_document`
- `elba_create_delivery_note`
- `elba_create_bill`
- `elba_get_bill`
- `elba_create_act`
- `elba_get_long_running_task`
- `elba_create_document_link`
- `elba_update_document_link`
- `elba_get_document_link`
- `elba_delete_document_link`
- `elba_list_document_templates`
- `elba_get_document_template`
