# StackBlitz.zip

A simple Nitro v3 API that lets you download StackBlitz projects by changing the domain from `stackblitz.com` to `stackblitz.zip`.

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

- http://localhost:3000/edit/nuxt-starter-k7spa3r4.zip
- http://localhost:3000/edit/vitejs-vite-starter.zip

The `.zip` extension is optional but makes it clear you're downloading a zip file.

## Deployment

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Deploy the `.output` directory to any Node.js hosting platform.
