"use client"
import { useUI } from "./cart-ui-context"
import { useEffect, useRef, useState } from "react"
import { setMockUser } from "../lib/firebase"

export default function LoginModal() {
  const { authOpen, closeAuth } = useUI()
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [stage, setStage] = useState("phone") // phone | code
  const recaptchaRef = useRef(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authOpen) {
      setPhone("")
      setOtp("")
      setStage("phone")
      setError("")
    }
  }, [authOpen])

  async function signInWithGoogle() {
    setLoading(true)
    try {
      // Mock Google sign-in
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        email: 'user@example.com',
        displayName: 'Mock User',
        photoURL: '/placeholder-user.jpg'
      }
      setMockUser(mockUser)
      // Trigger storage event to update navbar
      window.dispatchEvent(new Event('storage'))
      closeAuth()
    } catch (e) {
      setError(e?.message || "Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  async function sendOtp() {
    setLoading(true)
    try {
      // Mock OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStage("code")
    } catch (e) {
      setError(e?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  async function confirmOtp() {
    setLoading(true)
    try {
      // Mock OTP verification - accept any 6-digit code
      if (otp.length === 6) {
        const mockUser = {
          uid: 'mock-user-' + Date.now(),
          phoneNumber: phone,
          displayName: 'Phone User'
        }
        setMockUser(mockUser)
        // Trigger storage event to update navbar
        window.dispatchEvent(new Event('storage'))
        closeAuth()
      } else {
        throw new Error('Please enter a 6-digit code')
      }
    } catch (e) {
      setError(e?.message || "Invalid code")
    } finally {
      setLoading(false)
    }
  }

  if (!authOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuth} />
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background p-6 sm:p-8 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Welcome Back</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Sign in to save addresses and track orders.
            </p>
          </div>
          <button
            onClick={closeAuth}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <button
          onClick={signInWithGoogle}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 sm:py-4 text-sm sm:text-base font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border"></div>
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div ref={recaptchaRef} id="recaptcha-container" />

        {stage === "phone" ? (
          <div className="space-y-4">
            <label className="block text-sm sm:text-base">
              <span className="font-medium">Phone number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="mt-2 w-full rounded-md border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </label>
            <button
              onClick={sendOtp}
              className="w-full rounded-lg border-2 px-4 py-3 sm:py-4 text-sm sm:text-base font-medium hover:bg-secondary disabled:opacity-60 transition-all"
              disabled={loading || !phone}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm sm:text-base">
              <span className="font-medium">Enter OTP</span>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                maxLength={6}
                className="mt-2 w-full rounded-md border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-center tracking-wider focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </label>
            <button
              onClick={confirmOtp}
              className="w-full rounded-lg border-2 px-4 py-3 sm:py-4 text-sm sm:text-base font-medium hover:bg-secondary disabled:opacity-60 transition-all"
              disabled={loading || !otp}
            >
              {loading ? "Verifying..." : "Confirm Code"}
            </button>
            <button
              onClick={() => setStage("phone")}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to phone number
            </button>
          </div>
        )}

        <p className="mt-6 text-xs sm:text-sm text-center text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-destructive/10 p-3 sm:p-4 text-xs sm:text-sm text-destructive">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
