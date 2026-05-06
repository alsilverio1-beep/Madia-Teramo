import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Steakhouse } from './pages/Steakhouse';
import { EventsQuote } from './pages/EventsQuote';
import { TerraceDetails } from './pages/TerraceDetails';
import { Prenota } from './pages/Prenota';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/steakhouse" element={<Steakhouse />} />
          <Route path="/preventivo-eventi" element={<EventsQuote />} />
          <Route path="/scopri-terrazza" element={<TerraceDetails />} />
          <Route path="/prenota" element={<Prenota />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
