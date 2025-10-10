"use client"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import CartDrawer from "../../components/cart-drawer"
import LoginModal from "../../components/login-modal"
import { UIProvider } from "../../components/cart-ui-context"
import ProductCard from "../../components/product-card"
import { getFirebase } from "../../lib/firebase"

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
    async function load() {
      try {
        const { db } = getFirebase()
        if (!db) return
        const { collection, getDocs } = require("firebase/firestore")
        const snap = await getDocs(collection(db, "products"))
        let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        
        // Filter to keep only honey products
        items = items.filter((item) => 
          item.name && item.name.toLowerCase().includes("honey")
        )
        
        // Ensure all items have proper imageUrl
        items = items.map((item) => ({
          ...item,
          imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=500&q=80"
        }))
        
        if (items.length) setProducts(items)
      } catch (e) {
        console.warn("[v0] Using fallback product list", e)
      }
    }
    load()
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
