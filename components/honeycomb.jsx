"use client"
import { useState } from "react"

const facts = [
  { label: "Bees per hive", value: "Up to 60,000", icon: "🐝" },
  { label: "Nectar to honey", value: "2 million flowers → 1 lb", icon: "🌸" },
  { label: "Queen lifespan", value: "~5 years", icon: "👑" },
  { label: "Hexagon strength", value: "Efficient + sturdy", icon: "⬡" },
  { label: "Raw honey", value: "Enzymes + antioxidants", icon: "🍯" },
  { label: "Bee dances", value: "Waggle to navigate", icon: "💃" },
]

export default function Honeycomb() {
  const [hover, setHover] = useState(null)
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-10 md:mb-12">
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl">The Honeycomb</h3>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Fascinating facts about our buzzing friends
        </p>
      </div>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
        {facts.map((f, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setHover(hover === idx ? null : idx)}
            className="relative group cursor-pointer"
            aria-describedby={hover === idx ? `tip-${idx}` : undefined}
          >
            <div className="hex pulse bg-primary/20 hover:bg-primary/30 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl">{f.icon}</span>
            </div>
            <div
              id={`tip-${idx}`}
              role="tooltip"
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-14 whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-xs sm:text-sm text-accent-foreground shadow-lg transition-all duration-300 z-10 ${hover === idx ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="font-semibold">{f.label}</div>
              <div className="text-xs mt-1">{f.value}</div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .hex {
          width: 80px;
          height: 45px;
          background: var(--color-primary);
          position: relative;
          margin: 30px auto;
          border-radius: 8px;
          transition: all 300ms ease;
        }
        @media (min-width: 640px) {
          .hex {
            width: 100px;
            height: 55px;
          }
        }
        .hex:before,
        .hex:after {
          content: '';
          position: absolute;
          width: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
        }
        @media (min-width: 640px) {
          .hex:before,
          .hex:after {
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
          }
        }
        .hex:before {
          bottom: 100%;
          border-bottom: 23px solid var(--color-primary);
        }
        @media (min-width: 640px) {
          .hex:before {
            border-bottom: 28px solid var(--color-primary);
          }
        }
        .hex:after {
          top: 100%;
          border-top: 23px solid var(--color-primary);
        }
        @media (min-width: 640px) {
          .hex:after {
            border-top: 28px solid var(--color-primary);
          }
        }
        .pulse {
          animation: pulse 6s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .group:hover .hex {
          transform: scale(1.1);
          background: var(--color-primary);
        }
        .group:hover .hex:before {
          border-bottom-color: var(--color-primary);
        }
        .group:hover .hex:after {
          border-top-color: var(--color-primary);
        }
      `}</style>
    </section>
  )
}
