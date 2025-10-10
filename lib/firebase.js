// Mock authentication system for frontend-only deployment
let mockUser = null

export function getFirebase() {
  // Return empty object to maintain compatibility
  return {}
}

// Mock authentication functions
export function getCurrentUser() {
  return mockUser
}

export function setMockUser(user) {
  mockUser = user
  if (typeof window !== "undefined") {
    localStorage.setItem('mockUser', JSON.stringify(user))
  }
}

export function clearMockUser() {
  mockUser = null
  if (typeof window !== "undefined") {
    localStorage.removeItem('mockUser')
  }
}

export function initMockAuth() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem('mockUser')
    if (stored) {
      mockUser = JSON.parse(stored)
    }
  }
}
