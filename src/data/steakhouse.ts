export interface SteakhouseItem {
  id: string;
  name: string;
  description: string;
  price: number | string;
  section: 'italiane' | 'internazionali' | 'territorio' | 'contorni';
  subcategory: string;
  isSpecialty?: boolean;
}

export const steakhouseData: SteakhouseItem[] = [

  // ── RAZZE ITALIANE ──────────────────────────────────────────
  { id: 'it-1', section: 'italiane', subcategory: 'Chianina IGP', name: 'Fiorentina', description: 'Taglio classico con filetto e controfiletto separati dall\'osso a T. Frollatura minima 45 giorni. Cottura consigliata al sangue. Prezzo al kg.', price: '85 / kg', isSpecialty: true },
  { id: 'it-2', section: 'italiane', subcategory: 'Chianina IGP', name: 'Costata', description: 'Taglio alto con osso, ricco di marmorizzazione naturale. Frollatura 45 giorni, servita con sale Maldon e olio EVO.', price: '75 / kg' },
  { id: 'it-3', section: 'italiane', subcategory: 'Chianina IGP', name: 'Filetto', description: 'Il taglio più tenero del bovino, privo di osso e con fibra finissima. Cottura a scelta dallo chef.', price: 42 },
  { id: 'it-4', section: 'italiane', subcategory: 'Fassona Piemontese', name: 'Fiorentina Fassona', description: 'Razza a doppio muscolo, carne magra con consistenza setosa e sapore delicato. Frollatura 30 giorni.', price: '70 / kg', isSpecialty: true },
  { id: 'it-5', section: 'italiane', subcategory: 'Fassona Piemontese', name: 'Controfiletto', description: 'Taglio senza osso, morbido e saporito. Servito con burro alle erbe aromatiche di montagna.', price: 36 },
  { id: 'it-6', section: 'italiane', subcategory: 'Marchigiana', name: 'T-Bone Marchigiana', description: 'Bovino autoctono delle Marche, allevato allo stato semibrado. Carne rossastra e sapore intenso, frollatura 40 giorni.', price: '72 / kg' },

  // ── RAZZE INTERNAZIONALI ────────────────────────────────────
  { id: 'int-1', section: 'internazionali', subcategory: 'Rubia Gallega', name: 'Costata Rubia Gallega', description: 'Bovino galiziano di età avanzata, grasso giallo intenso dal sapore burroso. Frollatura 50+ giorni. Esperienza unica.', price: '95 / kg', isSpecialty: true },
  { id: 'int-2', section: 'internazionali', subcategory: 'Rubia Gallega', name: 'Filetto Rubia Gallega', description: 'La versione più elegante della Rubia, con note tostate e di nocciola che si sciolgono al palato.', price: 52 },
  { id: 'int-3', section: 'internazionali', subcategory: 'Black Angus', name: 'Ribeye Black Angus', description: 'Taglio americano per eccellenza, ricco di marmorizzazione. Frollatura 30 giorni, cottura alla brace di legna.', price: 44 },
  { id: 'int-4', section: 'internazionali', subcategory: 'Black Angus', name: 'Striploin Black Angus', description: 'Controfiletto australiano senza osso, bilanciato tra tenerezza e sapore. Servito con jus di carne.', price: 40 },
  { id: 'int-5', section: 'internazionali', subcategory: 'Sashi Beef', name: 'Ribeye Sashi AAA', description: 'Selezione nordica con marezzatura Kobe-style straordinaria. Frollatura 45 giorni. Il taglio più pregiato in carta.', price: 65, isSpecialty: true },
  { id: 'int-6', section: 'internazionali', subcategory: 'Sashi Beef', name: 'Tomahawk Sashi', description: 'Costata con osso lungo 30 cm, imponente e scenografica. Per due persone. Frollatura 45 giorni.', price: '130 / pezzo' },

  // ── DAL TERRITORIO ──────────────────────────────────────────
  { id: 'ter-1', section: 'territorio', subcategory: 'Agnello Abruzzese', name: 'Costolette di Agnello alla Brace', description: 'Agnello dei Monti della Laga, affumicato al legno di melo. Sapore intenso e autentico della tradizione abruzzese.', price: 28, isSpecialty: true },
  { id: 'ter-2', section: 'territorio', subcategory: 'Agnello Abruzzese', name: 'Coscio di Agnello', description: 'Cottura lenta alla brace con erbe aromatiche del Gran Sasso. Servito con patate al rosmarino.', price: 32 },
  { id: 'ter-3', section: 'territorio', subcategory: 'Maiale Artigianale', name: 'Costine di Maiale BBQ', description: 'Maiale allevato in libertà in provincia di Teramo, costine marinate 24 ore e grigliate lentamente.', price: 24 },
  { id: 'ter-4', section: 'territorio', subcategory: 'Maiale Artigianale', name: 'Arrosticini della Casa', description: 'Versione dello chef degli arrosticini abruzzesi: carne di pecora dei Monti della Laga, sale e pepe. Porzione da 10.', price: 14 },

  // ── CONTORNI ────────────────────────────────────────────────
  { id: 'con-1', section: 'contorni', subcategory: 'Contorni', name: 'Patate al Burro e Timo', description: 'Patate novelle al forno con burro di malga e timo fresco.', price: 7 },
  { id: 'con-2', section: 'contorni', subcategory: 'Contorni', name: 'Verdure Grigliate di Stagione', description: 'Selezione di verdure di stagione con olio EVO e sale Maldon.', price: 7 },
  { id: 'con-3', section: 'contorni', subcategory: 'Contorni', name: 'Spinaci all\'Aglio', description: 'Spinaci freschi ripassati in padella con aglio, olio EVO e peperoncino.', price: 6 },
  { id: 'con-4', section: 'contorni', subcategory: 'Contorni', name: 'Funghi Trifolati', description: 'Misto di porcini e champignon trifolati con aglio e prezzemolo.', price: 9 },
  { id: 'con-5', section: 'contorni', subcategory: 'Salse Artigianali', name: 'Salsa Chimichurri', description: 'Classica salsa argentina a base di prezzemolo, aglio, origano e aceto di vino rosso.', price: 3 },
  { id: 'con-6', section: 'contorni', subcategory: 'Salse Artigianali', name: 'Burro al Tartufo Nero', description: 'Burro di montagna lavorato con tartufo nero estivo dell\'Abruzzo.', price: 5 },
  { id: 'con-7', section: 'contorni', subcategory: 'Salse Artigianali', name: 'Jus di Carne al Rosmarino', description: 'Riduzione di fondo bruno con rosmarino fresco e vino rosso abruzzese.', price: 3 },
];
