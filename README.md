# TechHub.dk

A React and Vite hardware store demo with product browsing, product detail pages, etc.

## Technology

- React 18
- JavaScript and JSX
- Vite
- CSS
- Node.js HTTP API

## Requirements

- Node.js 18 or newer
- npm

### 1. Install dependencies

```powershell
npm install
```

### 2. Start the frontend

run:

```powershell
npm run dev
```

Open the local URL:
http://localhost:5173

### 3. Start the backend

```powershell
npm run server
```

The API runs at:

```text
http://localhost:3001
```

## Available commands

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `npm install`    | Install project dependencies           |
| `npm run dev`    | Start the Vite development server      |
| `npm run server` | Start the Node.js API server           |
| `npm run build`  | Create the production build in `dist/` |
| `npm start`      | Start the Node.js API server           |

## Production build

To create an optimized frontend build:

```powershell
npm run build
```

The generated files are placed in `dist/`. Deploy that folder to a static hosting service such as Netlify, Vercel, or GitHub Pages. The API server must be hosted separately if newsletter and support forms are required in production.

## Troubleshooting

### `npm` or `node` is not recognized

Install Node.js from (https://nodejs.org/), restart VS Code, and verify:

```powershell
node --version
npm --version
```

### `package.json` cannot be found

The terminal is in `src`:

```powershell
cd src
```

Then run the npm command again.

### The API shows `Not found`

Make sure the backend is running with `npm run server`, then visit:

```text
http://localhost:3001/api/health
```
