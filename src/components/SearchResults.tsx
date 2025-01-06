import { Stack, Card, ScrollArea } from '@mantine/core';
import { search, DocumentChunk } from './Query'; 
import { useEffect, useState, useContext } from 'react';
import { StateContext } from '../State';

interface SearchResult {
  filepath: string;
  chunk: DocumentChunk[];
}

export default function SearchResults() {
    const [docs, setDocs] = useState(Array<SearchResult>());
    const appState = useContext(StateContext);

    useEffect(() => {
        const getDocs = async () => {
          const results = await search(appState?.searchFilter);
          let searchResults = new Map<string, SearchResult>();
          results.forEach((doc: DocumentChunk) => {
            let filepath = doc.filepath? doc.filepath : "";
            let file = searchResults.get(filepath) || {filepath: filepath, chunk: []};
            file.chunk.push(doc);
            searchResults.set(filepath, file);
          });
          setDocs(Array.from(searchResults.values()));
        };
      
        if (appState?.searchActive) {
          getDocs(); // run it, run it
        } else {
          setDocs([]);
        }
      
        return () => {
          // this now gets called when the component unmounts
        };
      }, [appState?.searchFilter]);

    const handleCardClick = (doc: SearchResult) => {
        if (appState) {
          console.log("Setting active card to: ", doc.filepath);
          let chunk = doc.chunk[0];
          appState.setActiveCard(chunk);
          appState.setPageNumber(chunk.page ? parseInt(chunk.page) : 1);
        }
    };

    return (
        <Stack gap="md">
            <ScrollArea h={800} scrollbarSize={20}>
              {docs.map((card, index) => (
                <Card key={index} shadow="xs" padding="md" radius="md" w={350}
                onClick={() => handleCardClick(card)}>
                      <span>{card.filepath} [page {card.chunk[0].page}]</span>
                  </Card>
              ))}
            </ScrollArea>
        </Stack>
    );
}