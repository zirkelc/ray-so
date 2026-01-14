# ray.so (Code Images Fork)

A fork of [ray.so](https://github.com/raycast/ray-so) trimmed down to the **Code Images** feature.

## Features

- Create beautiful images of your code
- Share via short links (e.g., `yourdomain.com/Ab3Cd`)
- Embed link as comment in code

## Deploy Your Own

1. Fork this repo
2. Deploy to [Vercel](https://vercel.com)
3. Add a custom domain
4. Create a [Cloudflare KV](https://developers.cloudflare.com/kv/) namespace
5. Set environment variables (see below)

## Environment Variables

```
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_KV_NAMESPACE_ID=xxx
CLOUDFLARE_API_TOKEN=xxx
```

## Local Development

```bash
pnpm install
pnpm dev
```

## Credits

Built on [ray.so](https://ray.so) by [Raycast](https://raycast.com).
