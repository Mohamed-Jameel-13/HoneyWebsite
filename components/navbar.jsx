"use client"
import Link from "next/link"
import { useUI } from "./cart-ui-context"
import { useCart } from "../lib/cart-store"
import { useState } from "react"

export default function Navbar() {
  const { toggleCart, openAuth } = useUI()
  const { items } = useCart()
  const count = items.reduce((n, i) => n + i.quantity, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-foreground/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div aria-hidden="true" className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="sr-only">The Golden Hive logo</span>
              <span className="text-lg sm:text-xl text-primary-foreground font-serif">🐝</span>
            </div>
            <Link href="/" className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-foreground hover:text-primary transition-colors">
              The Golden Hive
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Shop All
              </Link>
            </li>
            <li>
              <Link href="/#our-story" className="hover:text-primary transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Open cart"
              onClick={toggleCart}
              className="relative rounded-md px-3 sm:px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm sm:text-base font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Cart</span>
              {count > 0 && (
                <span
                  aria-label={`${count} items in cart`}
                  className="absolute -top-2 -right-2 text-xs bg-accent text-accent-foreground rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={openAuth}
              className="hidden sm:inline-flex px-3 sm:px-4 py-2 rounded-md border hover:bg-secondary transition-colors text-sm sm:text-base font-medium"
              aria-label="Sign in to your account"
            >
              Sign In
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <Link 
              href="/" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link 
              href="/#our-story" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                openAuth()
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left py-2 text-base font-medium hover:text-primary transition-colors sm:hidden"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
