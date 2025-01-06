import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import { SearchFilter } from "../State";
import { AzureOpenAI } from 'openai';
const endpoint = "http://127.0.0.1:8002/aoaiApi";
const apiVersion = "2024-10-21"

const aoai_client = new AzureOpenAI({ 
    endpoint, 
    apiVersion,
    apiKey: import.meta.env.VITE_AOAI_KEY,
    dangerouslyAllowBrowser: true
});


// An example schema for documents in the index
export interface DocumentChunk {
  id?: string;
  filepath?: string | null;
  page?: string | null;
  polygon?: Array<number>;
  content?: string | null;
  contentVector?: Array<number>;
}

const client = new SearchClient<DocumentChunk>(
  "http://127.0.0.1:8002/searchApi",
  "index001",
  new AzureKeyCredential(import.meta.env.VITE_SEARCH_API_KEY),
  {
    allowInsecureConnection: true,
  }
);


export async function search(searchFilter: SearchFilter | undefined): Promise<DocumentChunk[]> {
  if (!searchFilter) {
    return [];
  }
  const embeddings = await aoai_client.embeddings.create({
    input: searchFilter.query,
    model: "text-embedding-3-large",
    dimensions: 1536,
  });

  const searchResults = await client.search("*", {
    select: ["filepath", "content", "page"],
    top: 20,
    vectorSearchOptions: {
      queries: [
        {
          kind: "vector",
          vector: embeddings.data[0].embedding,
          fields: ["contentVector"],
          kNearestNeighborsCount: 3,
          exhaustive: true
        }
      ]
    }
  });


  let results: DocumentChunk[] = [];
  for await (const result of searchResults.results) {
    console.log(result.document.filepath);
    results.push(result.document);
  }

  return results;
}