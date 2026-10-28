import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  label?: string
}

type CartItem = {
  product: Product
  quantity: number
}

const BRAND = {
  burgundy: '#861B31',
  pink: '#FF66C4',
  cream: '#FFF8F3',
  charcoal: '#241F21',
}

const WHATSAPP_NUMBER = '2348174159881'

const categories = [
  { name: 'All Pieces', image: '/products/product-04.jpg' },
  { name: 'Necklaces', image: '/products/product-20.jpg' },
  { name: 'Earrings', image: '/products/product-07.jpg' },
  { name: 'Bracelets', image: '/products/product-45.jpg' },
  { name: 'Watches', image: '/products/product-01.jpg' },
  { name: 'Anklets', image: '/products/product-57.jpg' },
]

const products: Product[] = [
  {
    id: 1,
    name: 'The Golden Hour',
    category: 'Necklaces',
    price: 15000,
    image: '/products/product-42.jpg',
    label: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Pearl Muse Earrings',
    category: 'Earrings',
    price: 5000,
    image: '/products/product-08.jpg',
    label: 'NEW ARRIVAL',
  },
  {
    id: 3,
    name: 'The Everyday Classic',
    category: 'Watches',
    price: 20000,
    image: '/products/product-01.jpg',
  },
  {
    id: 4,
    name: 'Golden Embrace',
    category: 'Bracelets',
    price: 5000,
    image: '/products/product-34.jpg',
  },
  {
    id: 5,
    name: 'Golden Hour Anklet',
    category: 'Anklets',
    price: 5000,
    image: '/products/product-55.jpg',
  },
  {
    id: 6,
    name: 'The Statement Piece',
    category: 'Necklaces',
    price: 15000,
    image: '/products/product-18.jpg',
  },
  {
    id: 7,
    name: 'Blush Elegance',
    category: 'Earrings',
    price: 5000,
    image: '/products/product-09.jpg',
  },
  {
    id: 8,
    name: 'Timeless Gold',
    category: 'Bracelets',
    price: 9000,
    image: '/products/product-22.jpg',
  },
]

const formatPrice = (price: number) =>
  `₦${price.toLocaleString('en-NG')}`

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState('All Pieces')
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All Pieces' ||
        product.category === activeCategory

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.product.id === product.id,
      )

      if (existing) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentCart, { product, quantity: 1 }]
    })

    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId),
    )
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return

    if (WHATSAPP_NUMBER.includes('X')) {
      window.alert(
        'Please add the Gems by Mima WhatsApp number in src/App.tsx before using checkout.',
      )
      return
    }

    const orderLines = cart
      .map(
        ({ product, quantity }) =>
          `• ${product.name} (${quantity} × ${formatPrice(product.price)})`,
      )
      .join('\n')

    const message = [
      'Hello Gems by Mima! 💎',
      '',
      'I would like to place an order for:',
      '',
      orderLines,
      '',
      `Order subtotal: ${formatPrice(subtotal)}`,
      '',
      'Please confirm availability and delivery details. Thank you!',
    ].join('\n')

    window.open(
      `https://wa.me/${2348174159881}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-[#241F21]">
      {/* Announcement bar */}
      <div className="bg-[#861B31] px-4 py-2.5 text-center text-[10px] tracking-[0.2em] text-white sm:text-xs">
        LITTLE DETAILS. LASTING IMPRESSIONS. <span className="mx-2">✦</span>
        YOUR STYLE, YOUR STORY.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#861B31]/10 bg-[#FFF8F3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            className="flex items-center gap-2 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#home" className="group text-center">
            <span className="block font-serif text-2xl font-medium tracking-[-0.06em] text-[#861B31] sm:text-3xl">
              gems<span className="text-[#241F21]">by</span>mima
            </span>
            <span className="mt-0.5 block text-[8px] uppercase tracking-[0.34em] text-[#861B31]/70">
              Jewellery & Accessories
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {['Home', 'Shop', 'Our Story'].map((item) => (
              <a
                key={item}
                href={
                  item === 'Home'
                    ? '#home'
                    : item === 'Shop'
                      ? '#shop'
                      : '#story'
                }
                className="text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-[#861B31]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="transition-colors hover:text-[#861B31]"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative flex items-center gap-2 transition-colors hover:text-[#861B31]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="hidden text-[10px] uppercase tracking-[0.14em] sm:inline">
                Bag
              </span>
              <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#861B31] px-1 text-[9px] text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[#861B31]/10 px-5 py-4">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Search size={18} className="text-[#861B31]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                  document.getElementById('shop')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
                placeholder="Search necklaces, earrings, watches..."
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#241F21]/40"
              />
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSearchOpen(false)
                }}
                aria-label="Close search"
              >
                <X size={19} />
              </button>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-5 border-t border-[#861B31]/10 bg-[#FFF8F3] px-6 py-6 lg:hidden">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>
              Collections
            </a>
            <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
              Shop all
            </a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)}>
              Our story
            </a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <main>
        <section
          id="home"
          className="relative grid min-h-[620px] overflow-hidden md:min-h-[690px] md:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 md:px-16 lg:px-24 lg:py-24">
            <div className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.27em] text-[#861B31]">
              <span className="h-px w-8 bg-[#861B31]" />
              THE ART OF ADORNMENT
            </div>

            <h1 className="max-w-xl font-serif text-[54px] font-normal leading-[1.04] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              Wear your
              <br />
              <span className="italic text-[#861B31]">kind</span> of
              <br />
              beautiful.
            </h1>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#241F21]/70 sm:text-base">
              Thoughtfully chosen pieces that say everything without saying
              a word. Find the little something that feels like you.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center gap-5 bg-[#861B31] px-6 text-[10px] uppercase tracking-[0.19em] text-white transition-all hover:bg-[#241F21]"
              >
                Explore the collection <ArrowRight size={16} />
              </a>

              <a
                href="#categories"
                className="text-[10px] uppercase tracking-[0.17em] underline underline-offset-4 decoration-[#861B31]/40 transition-colors hover:text-[#861B31]"
              >
                Discover more
              </a>
            </div>

            <div className="mt-14 flex items-center gap-4 border-t border-[#861B31]/15 pt-5">
              <Sparkles size={19} className="text-[#861B31]" strokeWidth={1.3} />
              <p className="text-[10px] uppercase leading-5 tracking-[0.14em] text-[#241F21]/65">
                Made for your moments.
                <br />
                Chosen by you. Worn your way.
              </p>
            </div>
          </div>

          <div className="relative min-h-[430px] bg-[#EADAD1] md:min-h-0">
            <img
              src="/products/product-20.jpg"
              alt="Elegant gold jewellery"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#241F21]/25 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10">
              <div>
               
                <p className="mt-2 font-serif text-3xl italic sm:text-4xl">
                  Everyday, elevated.
                </p>
              </div>
              <a
                href="#shop"
                aria-label="Explore new arrivals"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 transition-all hover:bg-white hover:text-[#861B31]"
              >
                <ArrowRight size={20} />
              </a>
            </div>

            <div className="absolute right-5 top-5 flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-[#FFF8F3] text-[#861B31] sm:right-8 sm:top-8 sm:h-[100px] sm:w-[100px]">
              <Sparkles size={17} strokeWidth={1.2} />
              <span className="mt-1 text-[8px] uppercase tracking-[0.16em]">
                Just for
              </span>
              <span className="font-serif text-lg italic">you</span>
            </div>
          </div>

          <a
            href="#categories"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#861B31]/65 md:flex"
          >
            Scroll to explore <ArrowDown size={13} />
          </a>
        </section>

        {/* Brand ticker */}
        <div className="overflow-hidden bg-[#861B31] py-4 text-white">
          <div className="flex min-w-max items-center justify-around gap-10 px-5 text-[9px] uppercase tracking-[0.25em] sm:text-[10px]">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className="flex items-center gap-10">
                THE PIECES YOU KEEP FOREVER <span className="text-[#FF66C4]">✳</span>
                LITTLE LUXURIES, BIG FEELINGS <span className="text-[#FF66C4]">✳</span>
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <section id="categories" className="px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#861B31]">
                  FIND YOUR FAVOURITE
                </p>
                <h2 className="font-serif text-4xl tracking-[-0.045em] sm:text-6xl">
                  A little something <span className="italic text-[#861B31]">for you.</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#241F21]/60">
                From your everyday essentials to the pieces that make an
                entrance. There is something here for every version of you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name)
                    document.getElementById('shop')?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                  className="group text-left"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EADAD1]">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241F21]/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4 font-serif text-xl text-white sm:text-2xl">
                      {category.name}
                    </span>
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF8F3]/90 text-[#861B31] opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section id="shop" className="bg-white/60 px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-9 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#861B31]">
                  THE GEMS EDIT
                </p>
                <h2 className="font-serif text-4xl tracking-[-0.045em] sm:text-6xl">
                  Pieces to <span className="italic text-[#861B31]">love.</span>
                </h2>
                <p className="mt-4 text-sm text-[#241F21]/60">
                  Your next favourite is waiting.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All Pieces', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Anklets'].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`border px-3 py-2 text-[9px] uppercase tracking-[0.1em] transition-all sm:px-4 sm:text-[10px] ${
                        activeCategory === category
                          ? 'border-[#861B31] bg-[#861B31] text-white'
                          : 'border-[#861B31]/20 text-[#241F21]/75 hover:border-[#861B31] hover:text-[#861B31]'
                      }`}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between border-b border-[#861B31]/10 pb-4">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#241F21]/55">
                {filteredProducts.length} pieces to discover
              </p>
              <span className="flex items-center gap-2 text-[10px] text-[#241F21]/50">
                <Sparkles size={13} /> Curated with love
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-serif text-3xl">No pieces found just yet.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All Pieces')
                  }}
                  className="mt-5 text-sm text-[#861B31] underline underline-offset-4"
                >
                  View all pieces
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#F0E5DF]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {product.label && (
                        <span className="absolute left-3 top-3 bg-[#FFF8F3] px-2.5 py-2 text-[8px] tracking-[0.15em] text-[#861B31] sm:left-4 sm:top-4">
                          {product.label}
                        </span>
                      )}

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={
                          favorites.includes(product.id)
                            ? 'Remove from favourites'
                            : 'Add to favourites'
                        }
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8F3]/90 transition-all sm:right-4 sm:top-4 ${
                          product.label ? 'mt-9 sm:mt-10' : ''
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={favorites.includes(product.id) ? BRAND.burgundy : 'none'}
                          color={favorites.includes(product.id) ? BRAND.burgundy : BRAND.charcoal}
                          strokeWidth={1.5}
                        />
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-[#861B31] py-4 text-[9px] uppercase tracking-[0.17em] text-white transition-transform duration-300 hover:bg-[#241F21] group-hover:translate-y-0 max-sm:translate-y-0 max-sm:bg-[#861B31]/95"
                      >
                        <Plus size={14} /> Add to bag
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-2 pt-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-[#241F21]/45">
                          {product.category}
                        </p>
                        <h3 className="mt-1.5 font-serif text-lg sm:text-xl">
                          {product.name}
                        </h3>
                      </div>
                      <p className="pt-4 text-xs font-medium whitespace-nowrap sm:text-sm">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#861B31] sm:hidden"
                    >
                      <Plus size={13} /> Add to bag
                    </button>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-14 text-center sm:mt-20">
              <p className="mb-5 font-serif text-2xl italic text-[#861B31]">
                Your next favourite is only a click away.
              </p>
             <Link
  to="/shop"
  className="inline-flex items-center justify-center bg-[#861B31] px-6 py-3 text-sm text-white transition hover:bg-[#6D1427]"
>
  Explore All Pieces
</Link>
            </div>
          </div>
        </section>

        {/* Editorial feature */}
        <section className="grid md:grid-cols-2">
          <div className="relative min-h-[400px] bg-[#EADAD1] md:min-h-[620px]">
            <img
              src="/products/product-17.jpg"
              alt="Jewellery details"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#F0E5DF] px-8 py-16 sm:px-14 md:px-16 lg:px-24">
            <p className="mb-6 text-[10px] uppercase tracking-[0.24em] text-[#861B31]">
              MORE THAN AN ACCESSORY
            </p>
            <h2 className="font-serif text-5xl leading-[1.08] tracking-[-0.05em] sm:text-7xl">
              It's not just
              <br />
              <span className="italic text-[#861B31]">jewellery.</span>
              <br />
              It's your story.
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#241F21]/70">
              The finishing touch before you step out. The gift you choose
              with someone special in mind. The little thing that makes an
              ordinary day feel different.
            </p>
            <a
              href="#shop"
              className="mt-8 inline-flex w-fit items-center gap-4 border-b border-[#861B31] pb-3 text-[10px] uppercase tracking-[0.18em] text-[#861B31]"
            >
              Find your piece <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#861B31]/20 text-[#861B31]">
              <Sparkles size={21} strokeWidth={1.3} />
            </span>
            <p className="mt-7 text-[10px] uppercase tracking-[0.26em] text-[#861B31]">
              A NOTE FROM GEMS BY MIMA
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.045em] sm:text-6xl">
              Beauty lives in
              <br />
              <span className="italic text-[#861B31]">the little things.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#241F21]/65 sm:text-base sm:leading-8">
              At Gems by Mima, we believe the right accessory is more than
              something you wear. It is an expression of who you are, how
              you feel, and the moments you want to remember. Explore pieces
              chosen to complement your individuality, one little detail at a time.
            </p>
            <a
              href="#shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#861B31] px-7 py-4 text-[10px] uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#241F21]"
            >
              Shop the collection <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* Contact banner */}
        <section className="bg-[#861B31] px-6 py-14 text-center text-white sm:py-20">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
            A LITTLE HELP FINDING YOUR GEM?
          </p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">
            Let's find your <span className="italic text-[#FFB3DF]">perfect piece.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/75">
            Have a question about a piece? Get in touch and let's help you
            find something you'll love.
          </p>
          <a
            href={`https://wa.me/${2348174159881}`}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-3 bg-[#FFF8F3] px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-[#861B31] transition-colors hover:bg-[#FF66C4] hover:text-[#241F21]"
          >
            Chat with us <ArrowRight size={15} />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 border-b border-[#861B31]/15 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="#home" className="font-serif text-3xl tracking-[-0.06em] text-[#861B31]">
              gems<span className="text-[#241F21]">by</span>mima
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#241F21]/60">
              Little details. Lasting impressions. Jewellery and accessories
              for every version of you.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#861B31]">
              EXPLORE
            </h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#241F21]/65">
              <a href="#shop" className="hover:text-[#861B31]">Shop all</a>
              <a href="#categories" className="hover:text-[#861B31]">Collections</a>
              <a href="#story" className="hover:text-[#861B31]">Our story</a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#861B31]">
              GET IN TOUCH
            </h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#241F21]/65">
              <a
                href={`https://wa.me/${2348174159881}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#861B31]"
              >
                WhatsApp
              </a>
              <a href="#shop" className="hover:text-[#861B31]">Find your next gem</a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 pt-6 text-center text-[9px] uppercase tracking-[0.13em] text-[#241F21]/45 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Gems by Mima. All rights reserved.</p>
          <p>Made for your moments <span className="text-[#861B31]">♥</span></p>
        </div>
      </footer>

      {/* Toast notification */}
      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap bg-[#241F21] px-5 py-4 text-xs text-white shadow-xl">
          <Check size={17} className="text-[#FF66C4]" />
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Cart backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#241F21]/45 backdrop-blur-[2px]"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Shopping cart drawer */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
        className={`fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-[460px] flex-col bg-[#FFF8F3] shadow-2xl transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#861B31]/15 px-6 py-6">
          <div>
            <p className="font-serif text-3xl">Your bag.</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#241F21]/50">
              {cartCount} {cartCount === 1 ? 'piece' : 'pieces'} selected
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close shopping cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#861B31]/15 hover:bg-[#861B31] hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={42} strokeWidth={1} className="text-[#861B31]/60" />
            <h3 className="mt-6 font-serif text-3xl">A little space for something lovely.</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#241F21]/60">
              Your bag is waiting for a piece that feels like you.
            </p>
            <button
              onClick={() => {
                setCartOpen(false)
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-7 flex items-center gap-3 bg-[#861B31] px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-white"
            >
              Explore the collection <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 border-b border-[#861B31]/10 py-5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-28 w-24 flex-shrink-0 object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#861B31]">
                      {product.category}
                    </p>
                    <h3 className="mt-1 font-serif text-xl">{product.name}</h3>
                    <p className="mt-1 text-sm">{formatPrice(product.price)}</p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-[#861B31]/20">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="p-2"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-7 text-center text-xs">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="p-2"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="flex items-center gap-1 text-[10px] text-[#861B31]"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#861B31]/15 bg-white/60 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.15em]">Subtotal</span>
                <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#241F21]/55">
                Delivery fees, availability, and final details will be confirmed on WhatsApp.
              </p>
              <button
                onClick={checkoutWhatsApp}
                className="mt-5 flex w-full items-center justify-center gap-3 bg-[#861B31] py-4 text-[10px] uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#241F21]"
              >
                Continue to WhatsApp <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-[0.15em] text-[#241F21]/65"
              >
                <ArrowLeft size={14} /> Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default App