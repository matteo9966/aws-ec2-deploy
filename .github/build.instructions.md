# Build Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Steps

1. **Install dependencies**
  ```bash
  npm install
  ```

2. **Build the project**
  ```bash
  npm run build
  ```

3. **Bundle into single file**
  ```bash
  npm run bundle
  ```

4. **Run on server**
  ```bash
  node dist/server.js
  ```

## Build Scripts (package.json)

Ensure your `package.json` includes:
- `build`: Compiles TypeScript/source files
- `bundle`: Bundles with webpack or esbuild into a single `.js` file
- `start`: Runs the bundled server

## Output
- Single bundled file: `dist/server.js` (or similar)
- Ready for deployment to AWS EC2