import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Steakhouse } from './pages/Steakhouse';
import { EventsQuote } from './pages/EventsQuote';
import { ScrollToTop } from './components/ScrollToTop';
import { BookingProvider } from './context/BookingContext';

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/steakhouse" element={<Steakhouse />} />
            <Route path="/preventivo-eventi" element={<EventsQuote />} />
          </Routes>
        </Layout>
      </BookingProvider>
    </BrowserRouter>
  );
}
