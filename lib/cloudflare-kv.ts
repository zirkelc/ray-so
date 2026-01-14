const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const KV_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_NAMESPACE_ID}`;

export async function kvGet<T>(key: string): Promise<T | null> {
  if (!CF_ACCOUNT_ID || !CF_NAMESPACE_ID || !CF_API_TOKEN) {
    throw new Error(`Missing Cloudflare KV configuration`);
  }

  const response = await fetch(`${KV_BASE_URL}/values/${key}`, {
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`KV GET failed: ${response.status}`);
  }

  return response.json();
}

export async function kvPut(key: string, value: unknown): Promise<void> {
  if (!CF_ACCOUNT_ID || !CF_NAMESPACE_ID || !CF_API_TOKEN) {
    throw new Error(`Missing Cloudflare KV configuration`);
  }

  const response = await fetch(`${KV_BASE_URL}/values/${key}`, {
    method: `PUT`,
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    throw new Error(`KV PUT failed: ${response.status}`);
  }
}
