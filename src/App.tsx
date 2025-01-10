import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { createTheme, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { StateProvider } from "./State.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocSearch from './pages/DocSearch';
import customTheme from './theme.ts';

const theme = createTheme(customTheme);

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
