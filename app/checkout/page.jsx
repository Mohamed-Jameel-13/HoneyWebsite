"use client"
import { useEffect, useMemo, useState } from "react"
import Navbar from "../../components/navbar"
import CartDrawer from "../../components/cart-drawer"
import LoginModal from "../../components/login-modal"
import { UIProvider } from "../../components/cart-ui-context"
import { useCart } from "../../lib/cart-store"
import { getFirebase } from "../../lib/firebase"
import Razorpay from "razorpay" // Declare the Razorpay variable

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [rzpReady, setRzpReady] = useState(false)

  const [addr, setAddr] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    save: true,
  })

  useEffect(() => {
    // Load Razorpay script
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.async = true
    s.onload = () => setRzpReady(true)
    document.body.appendChild(s)
    return () => {
      document.body.removeChild(s)
    }
  }, [])

  async function saveAddressIfNeeded() {
    if (!addr.save) return
    try {
      const { db, auth } = getFirebase()
      if (!db || !auth) return
      const { onAuthStateChanged } = require("firebase/auth")
      const { doc, setDoc } = require("firebase/firestore")
      await new Promise((resolve) =>
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            await setDoc(
              doc(db, "users", user.uid),
              {
                addresses: [
                  {
                    fullName: addr.fullName,
                    street: addr.street,
                    city: addr.city,
                    state: addr.state,
                    postalCode: addr.postalCode,
                    phone: addr.phone,
                  },
                ],
              },
              { merge: true },
            )
          }
          resolve(true)
        }),
      )
    } catch (e) {
      console.warn("[v0] Failed to save address", e)
    }
  }

  async function placeOrder() {
    setError("")
    if (!rzpReady) {
      setError("Payment not ready, please wait a moment.")
      return
    }
    try {
      // Create Razorpay order on server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(subtotal * 100), // paise
          currency: "USD",
          receipt: "gh_" + Date.now(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Order failed")

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_key",
        amount: data.amount,
        currency: data.currency,
        name: "The Golden Hive",
        description: "Honey order",
        order_id: data.id,
        prefill: {
          name: addr.fullName,
          contact: addr.phone,
        },
        notes: {
          address: `${addr.street}, ${addr.city} ${addr.state} ${addr.postalCode}`,
        },
        handler: (response) => {
          // Success
          clear()
          setStep(3)
        },
        theme: {
          color: "#FFB300",
        },
      }

      const rzp = new Razorpay(options) // Use the declared Razorpay variable
      rzp.open()
    } catch (e) {
      setError(e.message || "Payment failed")
    }
  }

  const Review = useMemo(
    () => (
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between">
            <span className="text-sm">
              {i.name} × {i.quantity}
            </span>
            <span className="text-sm">${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-medium">Total</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    ),
    [items, subtotal],
  )

  return (
    <UIProvider>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">Checkout</h1>

        {step === 1 && (
          <form
            className="mt-6 md:mt-8 space-y-4 md:space-y-6"
            onSubmit={async (e) => {
              e.preventDefault()
              setSaving(true)
              await saveAddressIfNeeded()
              setSaving(false)
              setSaved(true)
              setStep(2)
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                value={addr.fullName}
                onChange={(v) => setAddr({ ...addr, fullName: v })}
                required
              />
              <Input
                label="Phone number"
                value={addr.phone}
                onChange={(v) => setAddr({ ...addr, phone: v })}
                required
              />
            </div>
            <Input
              label="Street address"
              value={addr.street}
              onChange={(v) => setAddr({ ...addr, street: v })}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="City" value={addr.city} onChange={(v) => setAddr({ ...addr, city: v })} required />
              <Input label="State" value={addr.state} onChange={(v) => setAddr({ ...addr, state: v })} required />
              <Input
                label="Postal code"
                value={addr.postalCode}
                onChange={(v) => setAddr({ ...addr, postalCode: v })}
                required
              />
            </div>
            <label className="flex items-start gap-3 text-sm sm:text-base cursor-pointer">
              <input
                type="checkbox"
                checked={addr.save}
                onChange={(e) => setAddr({ ...addr, save: e.target.checked })}
                className="mt-1"
              />
              <span>Save this address for future orders</span>
            </label>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-primary px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
              disabled={saving}
            >
              {saving ? "Saving..." : "Continue to Payment"}
            </button>
          </form>
        )}

        {step === 2 && (
          <section className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-lg border bg-card p-4 sm:p-6">
              <h2 className="font-serif text-xl sm:text-2xl">Delivery Address</h2>
              <ul className="mt-4 text-sm sm:text-base text-muted-foreground space-y-1.5">
                <li className="font-medium text-foreground">{addr.fullName}</li>
                <li>{addr.street}</li>
                <li>
                  {addr.city}, {addr.state} {addr.postalCode}
                </li>
                <li>{addr.phone}</li>
              </ul>
              <button 
                onClick={() => setStep(1)} 
                className="mt-4 text-sm sm:text-base text-primary hover:underline"
              >
                Edit Address
              </button>
            </div>
            <div className="rounded-lg border bg-card p-4 sm:p-6">
              <h2 className="font-serif text-xl sm:text-2xl">Your Order</h2>
              <div className="mt-4">{Review}</div>
              <button
                onClick={placeOrder}
                className="mt-6 w-full rounded-md bg-primary px-4 py-3 sm:py-4 text-sm sm:text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Pay with Razorpay
              </button>
              {error && (
                <div className="mt-4 rounded-md bg-destructive/10 p-3 sm:p-4 text-sm sm:text-base text-destructive">
                  {error}
                </div>
              )}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="mt-10 md:mt-16 rounded-xl border bg-card p-6 sm:p-8 md:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">Thank You!</h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
              Your order has been placed successfully. A confirmation email will be sent to you shortly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm sm:text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm sm:text-base font-medium hover:bg-secondary transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </section>
        )}
      </main>
      <CartDrawer />
      <LoginModal />
    </UIProvider>
  )
}

function Input({ label, value, onChange, required }) {
  return (
    <label className="block text-sm sm:text-base">
      <span className="font-medium">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </label>
  )
}
