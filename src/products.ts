export type ProductCategory =
  | 'All'
  | 'Watches'
  | 'Necklaces'
  | 'Bracelets'
  | 'Anklets'
  | 'Earrings'
  | 'Sets'
  | 'Rings';

export type Product = {
  id: number;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  price: number;
  image: string;
};

const names = [
  'Classic Black Watch', 'Silver Link Watch', 'Star Pendant Necklace',
  'Golden Bracelet', 'Minimal Chain Necklace', 'Heart Pendant Necklace',
  'Colour Pop Earrings', 'Crystal Earrings', 'Floral Statement Earrings',
  'Layered Gold Necklace', 'Classic Jewellery Set', 'Crystal Necklace Set',
  'Statement Necklace Set', 'Elegant Matching Set', 'Colourful Jewellery Set',
  'Everyday Chain Necklace set', 'silver necklace set', 'Beaded Necklace set',
  'Sculpted Cuff Bracelet', 'classic necklace set', 'Gold two piece necklace',
  'Everyday Chain Bracelet', 'Rose Gold Watch', 'Everyday Gold bracelet',
  'Statement Earrings', 'Gold Stack Bracelet', 'Elegant Gold set',
  'Elegant silver Set', 'silver chain necklace sets', 'Red sculpted Bracelet 2',
  'silver bracelet', 'Classic silver necklace sets', 'Red Watch',
  'Gold Bracelet', 'Blue Diamond necklace', 'Gold statement sets', 'Layered Necklace set',
  'classy anklet', 'Colourful Jewellery Set', 'Statement sets',
  'Classic set', 'classy silver necklace set', 'Gold Anklet', 'Charm Necklace set',
  'Elegant Bracelet', 'Double Bracelet set', 'Classic Necklace set', 'Gold bracelet set',
  'Gold Necklace Set', 'Gold Bracelet set', 'Everyday Bracelet Set', 'Luxury Bracelet Set',
];

const categories: Exclude<ProductCategory, 'All'>[] = [
  'Watches', 'Watches', 'Necklaces', 'Bracelets', 'Necklaces', 'Necklaces',
  'Earrings', 'Earrings', 'Earrings', 'Necklaces', 'Sets', 'Sets', 'Sets',
  'Sets', 'Sets', 'Sets', 'Sets', 'Sets', 'Bracelets',
  'Sets', 'Necklaces', 'Bracelets', 'Watches', 'Bracelets', 'Earrings',
  'Bracelets', 'Sets', 'Sets', 'Sets', 'Bracelets', 'Bracelets',
  'Sets', 'Watches', 'Bracelets', 'Sets', 'Sets', 'Sets',
  'Anklets', 'Sets', 'Sets', 'Sets', 'Sets', 'Anklets',
  'Sets', 'Bracelets', 'Sets', 'Sets', 'Sets', 'Sets', 'Sets',
  'Sets', 'Sets',
];

const prices = [
  20000, 20000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
  15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 5000, 5000,
  5000, 9000, 20000, 5000, 5000, 5000, 15000, 10500, 15000, 5000,
  5000, 15000, 6000, 5000, 15000, 15000, 6500, 5000, 6500, 30000,
  30000, 15000, 5000, 15000, 5000, 6000, 6500, 6000, 6500, 6000,
  6000, 6000,
];

export const products: Product[] = names.map((name, index) => ({
  id: index + 1,
  name,
  category: categories[index],
  price: prices[index],
  image: `/products/product-${String(index + 1).padStart(2, '0')}.jpg`,
}));