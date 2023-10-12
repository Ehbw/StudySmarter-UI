import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages';
import ListSetsPage from './pages/set';
import SetPage from './pages/set/View';
import { TimelinePage } from './pages/timeline';
import { TimelineViewPage } from './pages/timeline/view';
import Template from './template';

import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core'

function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider defaultColorScheme="dark">
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
    </>
  )
}

export default App
