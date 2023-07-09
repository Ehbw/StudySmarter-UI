import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetcher } from './main';
import { IndexPage } from './pages';
import ListSetsPage from './pages/set';
import SetPage from './pages/set/View';
import { TimelinePage } from './pages/timeline';
import { TimelineViewPage } from './pages/timeline/view';
import Template from './template';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) => 
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme
        }}
      >
        <BrowserRouter>
          <Template>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/sets" element={<ListSetsPage />} />
              <Route
                path="/set/:setID"
                element={<SetPage />}
              />
              <Route 
                path="/timeline" 
                element={<TimelinePage />}
              />
              <Route 
                path="/timeline/:timelineID"
                element={<TimelineViewPage />}
              />
              </Routes>
          </Template>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
