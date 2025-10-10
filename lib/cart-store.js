"use client"

import useSWR from "swr"

const STORAGE_KEY = "gh-cart-v1"

function readStorage() {
  if (typeof window === "undefined") return { items: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function writeStorage(state) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useCart() {
  const { data, mutate } = useSWR("cart", readStorage, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    fallbackData: { items: [] },
  })

  function addItem(product, qty = 1) {
    mutate((current) => {
      const items = [...(current?.items || [])]
      const idx = items.findIndex((i) => i.id === product.id)
      if (idx >= 0) {
        const existing = items[idx]
        items[idx] = { ...existing, quantity: existing.quantity + qty }
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: qty,
        })
      }
      const next = { items }
      writeStorage(next)
      return next
    }, { revalidate: false, populateCache: true })
  }

  function updateQty(id, qty) {
    const safeQty = Math.max(1, qty)
    mutate((current) => {
      const items = (current?.items || []).map((it) =>
        it.id === id ? { ...it, quantity: safeQty } : it
      )
      const next = { items }
      writeStorage(next)
      return next
    }, { revalidate: false, populateCache: true })
  }

  function increment(id, step = 1) {
    mutate((current) => {
      const items = (current?.items || []).map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, Number(it.quantity || 0) + step) } : it
      )
      const next = { items }
      writeStorage(next)
      return next
    }, { revalidate: false, populateCache: true })
  }

  function decrement(id, step = 1) {
    increment(id, -Math.abs(step))
  }

  function removeItem(id) {
    mutate((current) => {
      const next = { items: (current?.items || []).filter((i) => i.id !== id) }
      writeStorage(next)
      return next
    }, { revalidate: false, populateCache: true })
  }

  function clear() {
    const next = { items: [] }
    writeStorage(next)
    mutate(next, { revalidate: false, populateCache: true })
  }

  const subtotal = (data?.items || []).reduce((sum, i) => sum + i.price * i.quantity, 0)

  return {
    items: data?.items || [],
    addItem,
    updateQty,
    increment,
    decrement,
    removeItem,
    clear,
    subtotal,
  }
}
