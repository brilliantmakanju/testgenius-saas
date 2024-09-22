"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { GripHorizontal } from 'lucide-react'

const colors = [
  { bg: 'bg-blue-600', text: 'text-white', border: 'border-white' },
  { bg: 'bg-indigo-600', text: 'text-white', border: 'border-white' },
  { bg: 'bg-purple-600', text: 'text-white', border: 'border-white' },
  { bg: 'bg-pink-600', text: 'text-white', border: 'border-white' },
  { bg: 'bg-teal-600', text: 'text-white', border: 'border-white' },
]

export default function NotFound() {
  const [colorScheme, setColorScheme] = useState(colors[0])
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
    const newColorScheme = colors[Math.floor(Math.random() * colors.length)]
    setColorScheme(newColorScheme)

    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      let clientX: number, clientY: number

      if ('touches' in event) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else {
        clientX = event.clientX
        clientY = event.clientY
      }

      const newX = clientX - container.left - 90 // 90px to the left
      const newY = clientY - container.top

      animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 })
      animate(y, newY, { type: 'spring', stiffness: 300, damping: 30 })

      createRipple(clientX, clientY)
    }
  }

  const createRipple = (x: number, y: number) => {
    const ripple = document.createElement('div')
    ripple.className = 'ripple'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    document.body.appendChild(ripple)
    setTimeout(() => document.body.removeChild(ripple), 1000)
  }

  function colorChange() {
    const style = document.createElement('style')
    style.textContent = `
      .ripple {
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        animation: ripple-effect 1s ease-out;
      }
      @keyframes ripple-effect {
        0% {
          transform: scale(1, 1);
          opacity: 1;
        }
        100% {
          transform: scale(1, 100);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }

  useEffect(() => {
    colorChange()
  }, [colorScheme])

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center ${colorScheme.bg} ${colorScheme.text} p-4 overflow-hidden relative transition-colors duration-500`}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest mb-4 relative z-10">
        Looks like you're lost
      </h2>
      <div
        className="relative z-20 cursor-pointer select-none touch-none"
      >
        <h1 className="text-[15vw] sm:text-[20vw] font-bold mb-4" aria-label="404" role="img">
          404
        </h1>
      </div>
      <p className="text-base sm:text-lg md:text-xl text-center mb-8 max-w-md relative z-10">
        We are sorry, but the page you requested was not found
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
        <a
          href="/"
          className="px-6 py-3 bg-white text-blue-600 text-sm sm:text-base rounded-md hover:bg-opacity-90 transition-colors text-center"
        >
          Go to Home
        </a>
        <a
          href="/contact"
          className="px-6 py-3 border border-white text-white text-sm sm:text-base rounded-md hover:bg-white hover:bg-opacity-20 transition-colors text-center"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}