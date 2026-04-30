const ELBA_API_BASE_URL = "https://elba-api.kontur.ru";
const ELBA_API_KEY = process.env.ELBA_API_KEY?.trim();

if (!ELBA_API_KEY) {
  throw new Error("Missing ELBA_API_KEY environment variable.");
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  query?: Record<string, unknown>;
  body?: unknown;
};

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl(path: string, query?: Record<string, unknown>): string {
  const url = new URL(`${ELBA_API_BASE_URL}${normalizePath(path)}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function buildBody(options?: RequestOptions): string | undefined {
  if (!options || !("body" in options) || options.body === undefined) {
    return undefined;
  }
  return JSON.stringify(options.body);
}

function buildHeaders(body: string | undefined): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Kontur-ApiKey": ELBA_API_KEY as string
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

async function parseSuccessPayload(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205 || response.status === 304) {
    return null;
  }

  const raw = await response.text();
  if (!raw) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.parse(raw);
  }

  return raw;
}

async function getFailureDetails(
  method: HttpMethod,
  url: string,
  response: Response
): Promise<string> {
  const responseBody = await response.text();
  const details = {
    method,
    url,
    status: response.status,
    statusText: response.statusText,
    responseHeaders: Object.fromEntries(response.headers.entries()),
    responseBody
  };
  return JSON.stringify(details, null, 2);
}

export async function elbaRequest(
  method: HttpMethod,
  path: string,
  options?: RequestOptions
): Promise<unknown> {
  const url = buildUrl(path, options?.query);
  const body = buildBody(options);
  const response = await fetch(url, {
    method,
    headers: buildHeaders(body),
    body
  });

  if (response.ok) {
    return parseSuccessPayload(response);
  }

  throw new Error(`Elba API request failed.\n${await getFailureDetails(method, url, response)}`);
}
