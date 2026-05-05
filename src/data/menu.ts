export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'antipasti' | 'primi' | 'secondi' | 'pizze' | 'dolci';
  image: string;
  isSpecialty?: boolean;
  isDaily?: boolean;
}

export const menuData: MenuItem[] = [
  // ANTIPASTI
  {
    id: 'a1',
    name: 'Battuta di Rubia Gallega',
    description: 'Battuta al coltello di frollatura 40 giorni, tuorlo d\'uovo bio, tartufo nero estivo e cialda di parmigiano 36 mesi.',
    price: 18,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
    isSpecialty: true
  },
  {
    id: 'a2',
    name: 'Carciofo alla Giudia Moderno',
    description: 'Carciofo croccante, spuma di pecorino di Farindola e polvere di liquirizia di Atri.',
    price: 14,
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1511690078353-71f669046277?auto=format&fit=crop&q=80&w=400'
  },
  // PRIMI
  {
    id: 'p1',
    name: 'Chitarrina ai Frutti di Bosco e Cervo',
    description: 'Pasta alla chitarra fatta in casa, ragù di cervo bianco frollato e riduzione ai frutti di bosco.',
    price: 22,
    category: 'primi',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400',
    isSpecialty: true
  },
  {
    id: 'p2',
    name: 'Raviolo del Pastore',
    description: 'Ravioli ripieni di ricotta di pecora, zafferano dell\'Aquila DOP e guanciale croccante di Campotosto.',
    price: 18,
    category: 'primi',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400'
  },
  // SECONDI (Focus Carmi Frollate)
  {
    id: 's1',
    name: 'Ribeye Sashi AAA',
    description: 'Taglio pregiato finlandese con marezzatura straordinaria, frollatura minima 60 giorni. Servito con patate al rosmarino.',
    price: 35,
    category: 'secondi',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=400',
    isSpecialty: true
  },
  {
    id: 's2',
    name: 'Costolette d\'Agnello al Fumo',
    description: 'Agnello dei Monti della Laga affumicato al legno di melo, servito con bieta ripassata.',
    price: 24,
    category: 'secondi',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
  },
  // PIZZE
  {
    id: 'pz1',
    name: 'Madia Signature',
    description: 'Impasto a 48h di maturazione, Bufala campana, carpaccio di manzo frollato, granella di pistacchio e zeste di limone.',
    price: 16,
    category: 'pizze',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
    isSpecialty: true
  },
  {
    id: 'pz2',
    name: 'Piazza Orsini',
    description: 'Pomodoro San Marzano, fior di latte, ventricina teramana e carciofini grigliati sott\'olio.',
    price: 13,
    category: 'pizze',
    image: 'https://images.unsplash.com/photo-1574129337531-f17b7ab0db41?auto=format&fit=crop&q=80&w=400'
  },
  // DOLCI
  {
    id: 'd1',
    name: 'Sfera di Cioccolato Bianco',
    description: 'Mousse di cioccolato bianco, cuore di lampone e terra di cacao amaro.',
    price: 9,
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd2',
    name: 'Il Nostro Tiramisù',
    description: 'Interpretazione dello Chef con savoiardi artigianali bagnati al caffè Teramano e crema vellutata.',
    price: 8,
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400',
    isDaily: true
  },
];
