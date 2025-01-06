# AI Frontend Demo Template

## Mantine + Vite

[Documentation](https://mantine.dev/guides/vite/)

## Setup

add a `.env` file to the root with the following content:

```bash

VITE_SEARCH_API_KEY=<YOUR SEARCH API KEY>
VITE_AOAI_KEY=<YOUR AZURE OPEN AI KEY>

```

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