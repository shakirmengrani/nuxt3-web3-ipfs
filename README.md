# Nuxt 3 NFT Basic Example

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
# run development server
npm run dev
# IPFS
docker run -d --name=ipfs -p5001:5001 ipfs/kubo

# Start Remix IDE 
yarn remixd -s ./contracts
```