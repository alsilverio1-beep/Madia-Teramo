import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { MenuPizza } from './pages/MenuPizza';
import { EventsQuote } from './pages/EventsQuote';
import { LavoraConNoi } from './pages/LavoraConNoi';
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
            <Route path="/menu-pizza" element={<MenuPizza />} />
            <Route path="/preventivo-eventi" element={<EventsQuote />} />
            <Route path="/lavora-con-noi" element={<LavoraConNoi />} />
          </Routes>
        </Layout>
      </BookingProvider>
    </BrowserRouter>
  );
}
