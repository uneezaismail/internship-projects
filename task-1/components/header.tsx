"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      
      setScrolled(currentScrollY > 20)

      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { name: "About", link: "#about", delay: 0.1 },
    { name: "Skills", link: "#skills", delay: 0.2 },
    { name: "Work", link: "#projects", delay: 0.3 },
    { name: "Contact", link: "#contact", delay: 0.4 },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed max-w-screen top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 backdrop-blur-xl bg-[#0a0a0a]/80 shadow-lg" : "py-5 bg-transparent"
      }`}
    >
      <div className=" container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="group relative flex items-center">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#64FFDA] to-[#0a81ab] opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a0a] border border-[#64FFDA]/30 group-hover:border-[#64FFDA] transition duration-300">
                <span className="text-[#64FFDA] font-bold text-xl">U</span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + item.delay }}
                >
                  <Link
                    href={item.link}
                    className="group relative text-gray-300 hover:text-[#64FFDA] transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                  >
                    <span className="text-[#64FFDA] font-mono mr-1">0{index + 1}.</span>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#64FFDA] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:block"
          >
            <a
              href="/uneeza_ismail.pdf"
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#64FFDA_0%,#0a81ab_50%,#64FFDA_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0a0a0a] px-6 py-1 text-sm font-medium text-[#64FFDA] backdrop-blur-3xl">
                Resume
              </span>
            </a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#64FFDA] focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-[#112240] shadow-xl flex flex-col"
          >
            <div className="flex flex-col items-center justify-center h-full p-8">
              <ul className="flex flex-col items-center space-y-6 mb-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={item.link}
                      className="text-gray-300 hover:text-[#64FFDA] transition-colors duration-300 text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[#64FFDA] font-mono mr-2">0{index + 1}.</span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <a
                  href="/resume.pdf"
                  className="inline-block px-8 py-3 border border-[#64FFDA] text-[#64FFDA] rounded hover:bg-[#64FFDA]/10 transition-colors duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
