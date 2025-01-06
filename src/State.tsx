import { createContext, useState, ReactNode } from 'react';
import { DocumentChunk } from './components/Query';

export interface SearchFilter {
    query: string;
}

interface StateContextProps {
  activeCard: DocumentChunk | null;
  setActiveCard: (activeCard: DocumentChunk) => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  searchFilter: SearchFilter;
  setSearchFilter: (searchFilter: SearchFilter) => void;
  searchActive: boolean;
  setSearchActive: (searchActive: boolean) => void;
}

export const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [activeCard, setActiveCard] = useState<DocumentChunk | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
      query: '',
  });
  const [searchActive, setSearchActive] = useState<boolean>(false);
  

  return (
    <StateContext.Provider value={{
        activeCard, setActiveCard,
        pageNumber, setPageNumber,
        searchFilter, setSearchFilter,
        searchActive, setSearchActive,
    }}>
      {children}
    </StateContext.Provider>
  );
};