import { AppShell, Avatar, Burger, Grid, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Filters from '../components/Filters';
import SearchResults from '../components/SearchResults';
import PdfViewer from '../components/PdfViewer';

export default function DocSearch() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 400,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header bg="rgb(18 58 94)">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Group align="center" gap={0}>
          <span style={{ color: 'white' }}>Document Search</span>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md"><Filters /></AppShell.Navbar>

      <AppShell.Main>
        <Grid>
          <Grid.Col span={5}>
            <h2>Search Results</h2>
            <SearchResults />
          </Grid.Col>
          <Grid.Col span={6}>
            <PdfViewer />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}