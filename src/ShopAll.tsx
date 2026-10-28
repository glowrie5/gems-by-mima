import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  X,
  MessageCircle,
} from 'lucide-react';

import { products, type ProductCategory } from './products.ts';

const WHATSAPP_NUMBER = '2348174159881';

const categories: ProductCategory[] = [
  'All',
  'Watches',
  'Necklaces',
  'Bracelets',
  'Anklets',
  'Earrings',
  'Sets',
  'Rings',
];

type CartLine = {
  product: (typeof products)[number];
  quantity: number;
};

const naira = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

export default function ShopAll() {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>('All');

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' ||
        product.category === activeCategory;

      const matchesSearch =
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const addToCart = (product: (typeof products)[number]) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id,
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const changeQuantity = (id: number, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const checkout = () => {
    if (cart.length === 0) return;


    const orderDetails = cart
      .map(
        ({ product, quantity }) =>
          `${product.name} x${quantity} — ${naira(product.price * quantity)}`,
      )
      .join('\n');

    const message =
      `Hello Gems by Mima! I would like to order:\n\n` +
      `${orderDetails}\n\n` +
      `Total: ${naira(total)}\n\n` +
      `Please confirm availability and delivery details.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#241F21]">
      <div className="bg-[#861B31] px-4 py-2 text-center text-xs tracking-[0.18em] text-[#FFF8F3]">
        LITTLE DETAILS. LASTING IMPRESSION.
      </div>

      <header className="sticky top-0 z-30 border-b border-[#861B31]/10 bg-[#FFF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <Link to="/" className="text-center">
            <span className="block font-serif text-xl tracking-[0.13em] text-[#861B31] md:text-2xl">
              GEMS BY MIMA
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em]">
              Accessories • Jewellery
            </span>
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-[#861B31]/20 px-3 py-2 text-sm"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Bag</span>

            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF66C4] px-1 text-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-8 md:pb-12 md:pt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#861B31]">
          The collection
        </p>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
              Find the piece that{' '}
              <span className="italic text-[#861B31]">
                feels like you.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#241F21]/65 md:text-base">
              Explore our collection of finishing touches,
              everyday favourites and statement pieces.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 border-b border-[#861B31]/30 pb-3 md:max-w-xs">
            <Search size={18} className="text-[#861B31]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the collection..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? 'border-[#861B31] bg-[#861B31] text-white'
                  : 'border-[#861B31]/20 hover:border-[#861B31]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between text-xs text-[#241F21]/60">
          <span>{visibleProducts.length} pieces</span>
          <span>Thoughtfully chosen for your style</span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {visibleProducts.map((product) => (
            <article key={product.id} className="group min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F1E8E1]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />

                <span className="absolute left-2 top-2 bg-[#FFF8F3]/90 px-2 py-1 text-[9px] uppercase tracking-wider text-[#861B31] sm:left-3 sm:top-3 sm:text-[10px]">
                  {product.category}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to bag`}
                  className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8F3] text-[#861B31] shadow-sm transition hover:bg-[#861B31] hover:text-white sm:bottom-3 sm:right-3"
                >
                  <Plus size={19} />
                </button>
              </div>

              <div className="pt-3">
                <h2 className="text-sm font-medium sm:text-base">
                  {product.name}
                </h2>

                <p className="mt-1 text-sm text-[#861B31]">
                  {naira(product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl">No pieces found</p>
            <p className="mt-2 text-sm text-[#241F21]/60">
              Try another search or category.
            </p>
          </div>
        )}
      </section>

      <footer className="bg-[#861B31] px-4 py-10 text-center text-[#FFF8F3]">
        <p className="font-serif text-xl tracking-[0.15em]">
          GEMS BY MIMA
        </p>

        <p className="mt-2 text-xs text-white/60">
          The little details make all the difference.
        </p>

        <Link
          to="/"
          className="mt-5 inline-block text-xs underline underline-offset-4"
        >
          Return to homepage
        </Link>
      </footer>

      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="flex h-full w-full max-w-md flex-col bg-[#FFF8F3] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#861B31]/15 px-5 py-5">
              <div>
                <p className="font-serif text-2xl">Your bag</p>
                <p className="mt-1 text-xs text-[#241F21]/55">
                  Orders are confirmed on WhatsApp.
                </p>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="rounded-full p-2 hover:bg-[#861B31]/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto text-[#861B31]" size={28} />
                  <p className="mt-3">
                    Your bag is waiting for something lovely.
                  </p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 border-b border-[#861B31]/10 py-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-20 object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="mt-1 text-sm text-[#861B31]">
                          {naira(product.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                          className="rounded-full border border-[#861B31]/20 p-1"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="text-sm">{quantity}</span>

                        <button
                          onClick={() => changeQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                          className="rounded-full border border-[#861B31]/20 p-1"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <p className="self-center text-sm">
                      {naira(product.price * quantity)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[#861B31]/15 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-[#241F21]/60">Subtotal</span>
                <span className="font-semibold">{naira(total)}</span>
              </div>

              <button
                disabled={!cart.length}
                onClick={checkout}
                className="flex w-full items-center justify-center gap-2 bg-[#861B31] px-4 py-4 text-sm font-medium text-white transition hover:bg-[#6D1427] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-[#241F21]/55">
                No online payment is collected on this website.
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}