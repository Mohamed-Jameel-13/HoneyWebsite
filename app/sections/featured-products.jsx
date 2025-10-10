"use client"
import { useEffect, useState, useRef } from "react"
import ProductCard from "../../components/product-card"
import { getFirebase } from "../../lib/firebase"

const fallback = [
  {
    id: "wildflower",
    name: "Wildflower Honey",
    description: "Floral and balanced—our most versatile classic.",
    price: 14.0,
    imageUrl: "/Wildflowerhoney.webp",
  },
  {
    id: "clover",
    name: "Clover Honey",
    description: "Light, bright sweetness with a gentle finish.",
    price: 12.0,
    imageUrl: "/Honey1.avif",
  },
  {
    id: "manuka",
    name: "Manuka Honey",
    description: "Rare, robust, and richly textured—sourced with care.",
    price: 28.0,
    imageUrl: "/Honey2.avif",
  },
  {
    id: "acacia",
    name: "Acacia Honey",
    description: "Delicate, clear, and slow to crystallize.",
    price: 18.0,
    imageUrl: "/Acacia-Honey-.webp",
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState(fallback)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebase()
        if (!db) return
        const { collection, query, limit, getDocs } = require("firebase/firestore")
        const snap = await getDocs(query(collection(db, "products"), limit(8)))
        let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        
        // Filter to keep only honey products
        items = items.filter((item) => 
          item.name && item.name.toLowerCase().includes("honey")
        )
        
        // Ensure all items have proper imageUrl
        items = items.map((item) => ({
          ...item,
          imageUrl: item.imageUrl || "/placeholder.jpg"
        }))
        
        if (items.length) setProducts(items.slice(0, 4))
      } catch (e) {
        console.warn("[v0] Using fallback featured products", e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Best Sellers</h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our most loved varieties, hand-selected by our beekeepers
        </p>
      </div>
      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.slice(0, 4).map((p, index) => (
          <div 
            key={p.id}
            className={`transition-all duration-500 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
