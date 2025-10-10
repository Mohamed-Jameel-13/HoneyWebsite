"use client"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import CartDrawer from "../../components/cart-drawer"
import LoginModal from "../../components/login-modal"
import { UIProvider } from "../../components/cart-ui-context"
import ProductCard from "../../components/product-card"

const fallback = [
  {
    id: "wildflower",
    name: "Wildflower Honey",
    description: "Floral and balanced—our most versatile classic. Perfect for everyday use.",
    price: 14.0,
    imageUrl: "/Wildflowerhoney.webp",
  },
  {
    id: "clover",
    name: "Clover Honey",
    description: "Light, bright sweetness with a gentle finish. Ideal for tea and baking.",
    price: 12.0,
    imageUrl: "/Honey1.avif",
  },
  {
    id: "manuka",
    name: "Manuka Honey",
    description: "Rare, robust, and richly textured—sourced with care from New Zealand.",
    price: 28.0,
    imageUrl: "/Honey2.avif",
  },
  {
    id: "acacia",
    name: "Acacia Honey",
    description: "Delicate, clear, and slow to crystallize. Light and mild flavor.",
    price: 18.0,
    imageUrl: "/Acacia-Honey-.webp",
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState(fallback)

  useEffect(() => {
    // Use fallback products for frontend-only deployment
    setProducts(fallback)
  }, [])

  return (
    <UIProvider>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Shop All Honey</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of artisanal honey, each variety hand-selected and sustainably harvested
          </p>
        </div>
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <CartDrawer />
      <LoginModal />
    </UIProvider>
  )
}
