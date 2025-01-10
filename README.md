# AI Frontend Demo Template

This template project is a starting point for an AI demo that is frontend focused.

## Setup

This setup expects that you already have access to search, document intelligence, and Azure Open AI resources.

### Config

Copy the `.env.template` file to `.env` in the root directory and add your keys.

Update the `vite.config.ts` file with your search and open ai endpoints:

```typescript
proxy: {
      '/searchApi': {
        target: 'https://MY-SEARCH-ENDPOINT.search.windows.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/searchApi/, ''),
      },
      '/aoaiApi': {
        target: 'https://MY-AZURE-OPENAI-ENDPOINT.openai.azure.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aoaiApi/, ''),
      },
    },
```

### Parsing PDFs

1. Add PDF documents to `/public/pdfs`
2. Copy the `/notebooks/.env.template` file to `/notebooks/.env` and fill in the values
2. Run the `/notebooks/ingest.ipynb` notebook

## Running the project

Run the following command to start the project:

```bash
yarn dev
```

Navigate to `127.0.0.1:8002` to view the app

## Customizing

### Logo

Replace `/public/logo.png` with your own image

### Theme Colors

1. Use a [mantine theme generator](https://kahvilei.github.io/mantine-theme-generator/) to create a custom theme.
2. Copy json
3. Swap out with the values in `/src/theme.ts`