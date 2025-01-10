import { pdfjs, Document, Page } from "react-pdf";
import { Group, Stack, Button } from '@mantine/core';
import { useContext, useState } from "react";
import { StateContext } from "../State";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer() {
    const appState = useContext(StateContext);
    const [numPages, setNumPages] = useState<number>();
  
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
      setNumPages(numPages);
    }
  
    function nextPage() {
      appState?.setPageNumber((v) => ++v);
    }
  
    function prevPage() {
      appState?.setPageNumber((v) => --v);
    }
  
    return (
        <Stack>
          {!appState?.activeCard?.filepath && <p>Select a document to view</p>}
          {appState?.activeCard?.filepath && (
            <>
              <Group justify="center">
                <Button onClick={prevPage}>Previous</Button>
                <p>
                    Page {appState.pageNumber} of {numPages}
                </p>
                <Button onClick={nextPage}>Next</Button>
              </Group>
              <Group justify="center">
                  <Document
                    file={"/pdfs/" + appState?.activeCard?.filepath + ".pdf"}
                    onLoadSuccess={onDocumentLoadSuccess}>
                      <Page pageNumber={appState.pageNumber} width={1000} />
                  </Document>
              </Group>
          </>
          )}
        </Stack>
      );
  }