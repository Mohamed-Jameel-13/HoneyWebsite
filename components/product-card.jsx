"use client"
import { useCart } from "../lib/cart-store"
import Image from "next/image"
import Link from "next/link"

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <Link href={`/shop/${product.id}`} className="group rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={product.imageUrl || "/placeholder.jpg"}
          alt={`${product.name} honey jar`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl line-clamp-1 min-h-[2rem] sm:min-h-[2.5rem]">{product.name}</h3>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-2 flex-1 min-h-[3rem]">
          {product.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-semibold text-xl sm:text-2xl">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm sm:text-base font-medium hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}
