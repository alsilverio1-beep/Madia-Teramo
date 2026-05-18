import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative z-10 bg-white w-full max-w-xl shadow-2xl overflow-y-auto"
            style={{ maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close bar */}
            <div className="flex justify-end px-3 py-2 bg-madia-green">
              <button
                onClick={() => setIsOpen(false)}
                className="text-madia-white/50 hover:text-madia-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* TheFork iframe */}
            <iframe
              src="https://widget.thefork.com/7ee298e1-d67f-44b1-91b1-94a070c1d883"
              allow="payment *"
              style={{
                width: '100%',
                height: '800px',
                border: 'none',
                display: 'block',
              }}
              title="Prenota un tavolo - Madia Teramo"
            />
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
