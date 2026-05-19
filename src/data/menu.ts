export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  section: 'aperitivo' | 'pranzo' | 'cena' | 'pizze' | 'drink' | 'carne';
  subcategory: string;
  isSpecialty?: boolean;
}

export const menuData: MenuItem[] = [

  // ── APERITIVO ──────────────────────────────────────────────
  { id: 'ap-s1', section: 'aperitivo', subcategory: 'Stuzzichini', name: 'Tagliere di Salumi Abruzzesi', description: 'Selezione di ventricina, salsiccia secca di fegato e lonza di Campotosto con crostini al farro.', price: 16, isSpecialty: true },
  { id: 'ap-s2', section: 'aperitivo', subcategory: 'Stuzzichini', name: 'Bruschette al Pomodoro Fresco', description: 'Pane casereccio tostato, pomodorini del Gran Sasso, aglio, basilico e olio EVO teramano.', price: 8 },
  { id: 'ap-s3', section: 'aperitivo', subcategory: 'Stuzzichini', name: 'Mini Arrosticini alla Brace', description: 'Arrosticini di pecora dei Monti della Laga, serviti con pane casereccio e salsa verde.', price: 14 },
  { id: 'ap-s4', section: 'aperitivo', subcategory: 'Stuzzichini', name: 'Olive Ascolane della Casa', description: 'Olive ascolane ripiene di carne bovina e maiale, fritte in olio di semi di arachide.', price: 10 },
  { id: 'ap-c1', section: 'aperitivo', subcategory: 'Cocktails', name: 'Aperol Spritz', description: 'Aperol, Prosecco DOC, soda e scorza d\'arancia.', price: 7 },
  { id: 'ap-c2', section: 'aperitivo', subcategory: 'Cocktails', name: 'Negroni della Casa', description: 'Gin artigianale, Campari e Vermouth rosso invecchiato, twist di arancia.', price: 9, isSpecialty: true },
  { id: 'ap-c3', section: 'aperitivo', subcategory: 'Cocktails', name: 'Hugo', description: 'Prosecco, sciroppo di fiori di sambuco, menta fresca e soda.', price: 7 },
  { id: 'ap-c4', section: 'aperitivo', subcategory: 'Cocktails', name: 'Bellini al Pesco', description: 'Purée di pesche fresche e Prosecco DOC, servito ghiacciato.', price: 8 },
  { id: 'ap-b1', section: 'aperitivo', subcategory: 'Bevande', name: 'Acqua Naturale / Frizzante', description: '75 cl', price: 3 },
  { id: 'ap-b2', section: 'aperitivo', subcategory: 'Bevande', name: 'Succhi di Frutta', description: 'Albicocca, pesca, arancia rossa — in bottiglia.', price: 4 },
  { id: 'ap-b3', section: 'aperitivo', subcategory: 'Bevande', name: 'Bibite', description: 'Coca-Cola, Fanta, Sprite, Tè Freddo.', price: 3 },

  // ── PRANZO ─────────────────────────────────────────────────
  { id: 'pr-a1', section: 'pranzo', subcategory: 'Antipasti', name: 'Battuta di Rubia Gallega', description: 'Battuta al coltello di frollatura 40 giorni, tuorlo d\'uovo bio, tartufo nero estivo e cialda di parmigiano 36 mesi.', price: 18, isSpecialty: true },
  { id: 'pr-a2', section: 'pranzo', subcategory: 'Antipasti', name: 'Carciofo alla Giudia Moderno', description: 'Carciofo croccante, spuma di pecorino di Farindola e polvere di liquirizia di Atri.', price: 14 },
  { id: 'pr-a3', section: 'pranzo', subcategory: 'Antipasti', name: 'Insalata di Mare Tiepida', description: 'Gamberi, calamari e vongole con rucola selvatica, limone e olio EVO del Teramano.', price: 16 },
  { id: 'pr-p1', section: 'pranzo', subcategory: 'Primi', name: 'Chitarrina al Ragù d\'Agnello', description: 'Pasta alla chitarra fatta in casa con ragù bianco di agnello dei Monti della Laga e pecorino di Farindola.', price: 16 },
  { id: 'pr-p2', section: 'pranzo', subcategory: 'Primi', name: 'Raviolo del Pastore', description: 'Ravioli ripieni di ricotta di pecora, zafferano dell\'Aquila DOP e guanciale croccante di Campotosto.', price: 18 },
  { id: 'pr-p3', section: 'pranzo', subcategory: 'Primi', name: 'Risotto alla Crema di Tartufo', description: 'Riso Carnaroli, crema di tartufo nero estivo, parmigiano 36 mesi e burro di montagna.', price: 20, isSpecialty: true },
  { id: 'pr-s1', section: 'pranzo', subcategory: 'Secondi', name: 'Costolette d\'Agnello alla Brace', description: 'Agnello dei Monti della Laga affumicato al legno di melo, con bieta ripassata all\'aglio.', price: 24 },
  { id: 'pr-s2', section: 'pranzo', subcategory: 'Secondi', name: 'Filetto di Manzo', description: 'Filetto di Chianina cotto al punto, con salsa al vino rosso e rosmarino fresco.', price: 28 },
  { id: 'pr-s3', section: 'pranzo', subcategory: 'Secondi', name: 'Salmone in Crosta di Erbe', description: 'Salmone selvaggio in crosta di erbe aromatiche, con purea di patate al timo.', price: 22 },
  { id: 'pr-co1', section: 'pranzo', subcategory: 'Contorni', name: 'Patate al Rosmarino', description: 'Patate novelle, olio EVO e rosmarino fresco, cotte al forno.', price: 6 },
  { id: 'pr-co2', section: 'pranzo', subcategory: 'Contorni', name: 'Verdure Grigliate di Stagione', description: 'Selezione di verdure di stagione grigliate con olio EVO e sale Maldon.', price: 7 },
  { id: 'pr-co3', section: 'pranzo', subcategory: 'Contorni', name: 'Insalata Mista', description: 'Lattuga, rucola, pomodorini, cetriolo e carote con dressing alla senape.', price: 5 },
  { id: 'pr-b1', section: 'pranzo', subcategory: 'Bevande', name: 'Acqua Naturale / Frizzante', description: '75 cl', price: 3 },
  { id: 'pr-b2', section: 'pranzo', subcategory: 'Bevande', name: 'Vino della Casa', description: 'Rosso, bianco o rosato — in caraffa da 50 cl.', price: 8 },
  { id: 'pr-b3', section: 'pranzo', subcategory: 'Bevande', name: 'Birra Artigianale', description: 'Selezione di birre artigianali abruzzesi alla spina.', price: 5 },
  { id: 'pr-b4', section: 'pranzo', subcategory: 'Bevande', name: 'Caffè', description: 'Espresso, macchiato o americano.', price: 2 },

  // ── CENA ───────────────────────────────────────────────────
  { id: 'ce-a1', section: 'cena', subcategory: 'Antipasti', name: 'Tartare di Fassona', description: 'Fassona piemontese battuta al coltello, senape di Digione, capperi di Pantelleria e uova di quaglia.', price: 20, isSpecialty: true },
  { id: 'ce-a2', section: 'cena', subcategory: 'Antipasti', name: 'Battuta di Rubia Gallega', description: 'Battuta al coltello di frollatura 40 giorni, tuorlo d\'uovo bio, tartufo nero estivo e cialda di parmigiano 36 mesi.', price: 18 },
  { id: 'ce-a3', section: 'cena', subcategory: 'Antipasti', name: 'Capasanta alla Brace', description: 'Capasanta su crema di piselli, guanciale croccante e riduzione al limone.', price: 22 },
  { id: 'ce-a4', section: 'cena', subcategory: 'Antipasti', name: 'Carciofo alla Giudia Moderno', description: 'Carciofo croccante, spuma di pecorino di Farindola e polvere di liquirizia di Atri.', price: 14 },
  { id: 'ce-p1', section: 'cena', subcategory: 'Primi', name: 'Chitarrina ai Frutti di Bosco e Cervo', description: 'Pasta alla chitarra fatta in casa, ragù di cervo bianco frollato e riduzione ai frutti di bosco.', price: 22, isSpecialty: true },
  { id: 'ce-p2', section: 'cena', subcategory: 'Primi', name: 'Raviolo del Pastore', description: 'Ravioli ripieni di ricotta di pecora, zafferano dell\'Aquila DOP e guanciale croccante di Campotosto.', price: 18 },
  { id: 'ce-p3', section: 'cena', subcategory: 'Primi', name: 'Risotto al Tartufo Nero', description: 'Riso Carnaroli mantecato al burro di montagna, tartufo nero estivo e parmigiano 36 mesi.', price: 24 },
  { id: 'ce-p4', section: 'cena', subcategory: 'Primi', name: 'Tagliolini al Granchio', description: 'Tagliolini all\'uovo, polpa di granchio, pomodorini confit e bottarga di muggine.', price: 22 },
  { id: 'ce-s1', section: 'cena', subcategory: 'Secondi', name: 'Ribeye Sashi AAA', description: 'Taglio pregiato con marezzatura straordinaria, frollatura minima 60 giorni. Servito con jus di carne.', price: 55, isSpecialty: true },
  { id: 'ce-s2', section: 'cena', subcategory: 'Secondi', name: 'Fiorentina di Chianina', description: 'Chianina IGP, frollatura 45 giorni, cotta alla brace di legna — al kg. Prezzo indicativo per 800g.', price: 70 },
  { id: 'ce-s3', section: 'cena', subcategory: 'Secondi', name: 'Costata di Angus Black', description: 'Black Angus australiano, frollatura 30 giorni, servita con burro alle erbe e sale Maldon.', price: 38 },
  { id: 'ce-s4', section: 'cena', subcategory: 'Secondi', name: 'Petto d\'Anatra alla Brace', description: 'Petto d\'anatra marinato, con riduzione ai mirtilli e purée di pastinaca.', price: 28 },
  { id: 'ce-co1', section: 'cena', subcategory: 'Contorni', name: 'Patate al Burro e Timo', description: 'Patate novelle al forno con burro di malga e timo fresco.', price: 7 },
  { id: 'ce-co2', section: 'cena', subcategory: 'Contorni', name: 'Spinaci all\'Aglio', description: 'Spinaci freschi ripassati in padella con aglio, olio EVO e peperoncino.', price: 6 },
  { id: 'ce-co3', section: 'cena', subcategory: 'Contorni', name: 'Verdure Grigliate di Stagione', description: 'Selezione di verdure di stagione grigliate con olio EVO e sale Maldon.', price: 7 },
  { id: 'ce-co4', section: 'cena', subcategory: 'Contorni', name: 'Funghi Trifolati', description: 'Misto di funghi porcini e champignon trifolati con aglio e prezzemolo.', price: 9 },
  { id: 'ce-b1', section: 'cena', subcategory: 'Bevande', name: 'Acqua Naturale / Frizzante', description: '75 cl', price: 3 },
  { id: 'ce-b2', section: 'cena', subcategory: 'Bevande', name: 'Vino Rosso — Montepulciano d\'Abruzzo DOC', description: 'Bottiglia da 75 cl.', price: 22 },
  { id: 'ce-b3', section: 'cena', subcategory: 'Bevande', name: 'Vino Bianco — Trebbiano d\'Abruzzo DOC', description: 'Bottiglia da 75 cl.', price: 20 },
  { id: 'ce-b4', section: 'cena', subcategory: 'Bevande', name: 'Birra Artigianale Abruzzese', description: 'Selezione alla spina — chiedi al cameriere le referenze del giorno.', price: 6 },

  // ── DRINK ──────────────────────────────────────────────
  { id: 'dr-c1', section: 'drink', subcategory: 'Cocktails Classici', name: 'Negroni', description: 'Gin, Campari, Vermouth rosso, twist di arancia.', price: 9, isSpecialty: true },
  { id: 'dr-c2', section: 'drink', subcategory: 'Cocktails Classici', name: 'Aperol Spritz', description: 'Aperol, Prosecco DOC, soda, scorza d\'arancia.', price: 7 },
  { id: 'dr-c3', section: 'drink', subcategory: 'Cocktails Classici', name: 'Hugo', description: 'Prosecco, sciroppo di sambuco, menta fresca, soda.', price: 7 },
  { id: 'dr-c4', section: 'drink', subcategory: 'Cocktails Classici', name: 'Mojito', description: 'Rum bianco, lime fresco, menta, zucchero di canna, soda.', price: 8 },
  { id: 'dr-c5', section: 'drink', subcategory: 'Cocktails Classici', name: 'Moscow Mule', description: 'Vodka, ginger beer, lime, menta.', price: 8 },
  { id: 'dr-c6', section: 'drink', subcategory: 'Cocktails Classici', name: 'Gin Tonic', description: 'Gin artigianale, tonica premium, scorza di limone e cetriolo.', price: 9 },
  { id: 'dr-s1', section: 'drink', subcategory: 'Signature Cocktails', name: 'Madia Mule', description: 'Vodka alla vaniglia, ginger beer, limone, basilico fresco e pepe rosa.', price: 10, isSpecialty: true },
  { id: 'dr-s2', section: 'drink', subcategory: 'Signature Cocktails', name: 'Gran Sasso Sour', description: 'Bourbon, succo di limone, sciroppo al miele del Gran Sasso, albume d\'uovo.', price: 10, isSpecialty: true },
  { id: 'dr-s3', section: 'drink', subcategory: 'Signature Cocktails', name: 'Teramo Spritz', description: 'Liquore alla genziana, Prosecco, acqua tonica, scorza di pompelmo rosa.', price: 9 },
  { id: 'dr-s4', section: 'drink', subcategory: 'Signature Cocktails', name: 'Abruzzo Negroni', description: 'Gin, Centerba Toro, Vermouth bianco, rosmarino affumicato.', price: 10 },
  { id: 'dr-a1', section: 'drink', subcategory: 'Analcolici', name: 'Virgin Mojito', description: 'Lime, menta, zucchero di canna, soda.', price: 6 },
  { id: 'dr-a2', section: 'drink', subcategory: 'Analcolici', name: 'Sunrise Analcolico', description: 'Succo di arancia, granatina, soda, scorza di arancia.', price: 6 },
  { id: 'dr-a3', section: 'drink', subcategory: 'Analcolici', name: 'Ginger Lemon', description: 'Ginger beer artigianale, succo di limone, miele, menta fresca.', price: 6 },
  { id: 'dr-b1', section: 'drink', subcategory: 'Birre', name: 'Birra Artigianale Abruzzese', description: 'Selezione alla spina — chiedi al cameriere le referenze del giorno.', price: 6 },
  { id: 'dr-b2', section: 'drink', subcategory: 'Birre', name: 'Birra in Bottiglia', description: 'Peroni, Moretti, Corona, Heineken.', price: 5 },
  { id: 'dr-v1', section: 'drink', subcategory: 'Vini al Calice', name: 'Montepulciano d\'Abruzzo DOC', description: 'Rosso strutturato, note di ciliegia e spezie.', price: 6 },
  { id: 'dr-v2', section: 'drink', subcategory: 'Vini al Calice', name: 'Trebbiano d\'Abruzzo DOC', description: 'Bianco secco, fresco e minerale.', price: 5 },
  { id: 'dr-v3', section: 'drink', subcategory: 'Vini al Calice', name: 'Cerasuolo d\'Abruzzo DOC', description: 'Rosato fruttato, ideale per l\'aperitivo.', price: 5 },

  // ── CARNE ──────────────────────────────────────────────────
  { id: 'ca-t1', section: 'carne', subcategory: 'Tagli alla Brace', name: 'Fiorentina di Chianina', description: 'Chianina IGP, frollatura 45 giorni, cotta alla brace di legna — al kg. Prezzo indicativo per 800g.', price: 70, isSpecialty: true },
  { id: 'ca-t2', section: 'carne', subcategory: 'Tagli alla Brace', name: 'Ribeye Sashi AAA', description: 'Taglio pregiato con marezzatura straordinaria, frollatura minima 60 giorni. Servito con jus di carne.', price: 55, isSpecialty: true },
  { id: 'ca-t3', section: 'carne', subcategory: 'Tagli alla Brace', name: 'Costata di Angus Black', description: 'Black Angus australiano, frollatura 30 giorni, servita con burro alle erbe e sale Maldon.', price: 38 },
  { id: 'ca-t4', section: 'carne', subcategory: 'Tagli alla Brace', name: 'Tomahawk di Rubia Gallega', description: 'Costata con osso lungo, Rubia Gallega spagnola, frollatura 50 giorni, per due persone.', price: 90, isSpecialty: true },
  { id: 'ca-t5', section: 'carne', subcategory: 'Tagli alla Brace', name: 'Filetto di Marchigiana', description: 'Filetto di razza Marchigiana, frollatura 21 giorni, con salsa al vino rosso e rosmarino.', price: 34 },
  { id: 'ca-a1', section: 'carne', subcategory: 'Antipasti di Carne', name: 'Tartare di Fassona', description: 'Fassona piemontese battuta al coltello, senape di Digione, capperi di Pantelleria e uova di quaglia.', price: 20, isSpecialty: true },
  { id: 'ca-a2', section: 'carne', subcategory: 'Antipasti di Carne', name: 'Battuta di Rubia Gallega', description: 'Battuta al coltello di frollatura 40 giorni, tuorlo d\'uovo bio, tartufo nero estivo e cialda di parmigiano 36 mesi.', price: 18 },
  { id: 'ca-a3', section: 'carne', subcategory: 'Antipasti di Carne', name: 'Mini Arrosticini alla Brace', description: 'Arrosticini di pecora dei Monti della Laga, serviti con pane casereccio e salsa verde.', price: 14 },
  { id: 'ca-co1', section: 'carne', subcategory: 'Contorni', name: 'Patate al Burro e Timo', description: 'Patate novelle al forno con burro di malga e timo fresco.', price: 7 },
  { id: 'ca-co2', section: 'carne', subcategory: 'Contorni', name: 'Verdure Grigliate di Stagione', description: 'Selezione di verdure di stagione grigliate con olio EVO e sale Maldon.', price: 7 },
  { id: 'ca-co3', section: 'carne', subcategory: 'Contorni', name: 'Funghi Trifolati', description: 'Misto di funghi porcini e champignon trifolati con aglio e prezzemolo.', price: 9 },
  { id: 'ca-co4', section: 'carne', subcategory: 'Contorni', name: 'Spinaci all\'Aglio', description: 'Spinaci freschi ripassati in padella con aglio, olio EVO e peperoncino.', price: 6 },

  // ── PIZZE ──────────────────────────────────────────────────
  { id: 'pz-r1', section: 'pizze', subcategory: 'Rosse', name: 'Margherita', description: 'Pomodoro San Marzano, fior di latte di Agerola, basilico fresco e olio EVO.', price: 10 },
  { id: 'pz-r2', section: 'pizze', subcategory: 'Rosse', name: 'Piazza Orsini', description: 'Pomodoro San Marzano, fior di latte, ventricina teramana e carciofini grigliati sott\'olio.', price: 13 },
  { id: 'pz-r3', section: 'pizze', subcategory: 'Rosse', name: 'Diavola', description: 'Pomodoro San Marzano, fior di latte, salame piccante e peperoncino fresco.', price: 12 },
  { id: 'pz-r4', section: 'pizze', subcategory: 'Rosse', name: 'Prosciutto e Funghi', description: 'Pomodoro, fior di latte, prosciutto cotto artigianale e funghi champignon.', price: 12 },
  { id: 'pz-b1', section: 'pizze', subcategory: 'Bianche', name: 'Madia Signature', description: 'Impasto a 48h di maturazione, Bufala campana, carpaccio di manzo frollato, granella di pistacchio e zeste di limone.', price: 16, isSpecialty: true },
  { id: 'pz-b2', section: 'pizze', subcategory: 'Bianche', name: 'Crudo e Burrata', description: 'Base bianca, burrata fresca, prosciutto crudo di Norcia e rucola selvatica.', price: 15 },
  { id: 'pz-b3', section: 'pizze', subcategory: 'Bianche', name: 'Patate e Rosmarino', description: 'Base bianca, patate a fette, rosmarino, olio EVO e sale Maldon.', price: 11 },
  { id: 'pz-sp1', section: 'pizze', subcategory: 'Speciali', name: 'Gran Sasso', description: 'Base pomodoro, fior di latte, tartare di manzo frollato, tartufo nero e parmigiano 36 mesi.', price: 20, isSpecialty: true },
  { id: 'pz-sp2', section: 'pizze', subcategory: 'Speciali', name: 'Boscaiola Madia', description: 'Base bianca, funghi porcini, salsiccia artigianale, provola affumicata e scaglie di tartufo.', price: 18 },
  { id: 'pz-sp3', section: 'pizze', subcategory: 'Speciali', name: 'Mare e Monti', description: 'Pomodoro, fior di latte, gamberi rossi, zucchine grigliate e bottarga di muggine.', price: 17 },
];
