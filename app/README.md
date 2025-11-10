# stackblitz.zip

A simple [Nitro](https://nitro.build) web service that lets you download [StackBlitz](https://stackblitz.com/) projects as zip files by changing the domain from `stackblitz.com` to `stackblitz.zip`.

Deployed on [Vercel](https://vercel.com) at [stackblitz.zip](https://stackblitz.zip).

> [!IMPORTANT]
> This project is not affiliated with or endorsed by StackBlitz in any way. Users are responsible for ensuring their use of this tool complies with [StackBlitz's Terms of Service](https://stackblitz.com/terms-of-service). Please review their terms before using this tool.

## Usage

Replace `stackblitz.com` with `stackblitz.zip` in any StackBlitz edit URL:

```bash
# Original URL
https://stackblitz.com/edit/nuxt-starter-k7spa3r4

# Download URL
https://stackblitz.zip/edit/nuxt-starter-k7spa3r4
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Visit http://localhost:3000 for API information.

## Examples

- http://localhost:3000/edit/nuxt-starter-k7spa3r4
- http://localhost:3000/edit/vitejs-vite-starter

## Deployment

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Deploy to any platform using [Nitro's deployment presets](https://nitro.build/deploy) - supports Vercel, Netlify, Cloudflare Pages, AWS, Azure, Node.js, and many more.
