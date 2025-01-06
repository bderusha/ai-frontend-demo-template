import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { StateProvider } from "./State.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocSearch from './pages/DocSearch';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DocSearch />} />
          </Routes>
        </Router>
      </StateProvider>
    </MantineProvider>
  );
}
