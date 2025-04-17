"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4 md:hidden">
            <a
              href="#"
              className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm font-mono"
          >
            <p>Designed & Built by Uneeza Ismail</p>
            <p className="text-gray-600 text-xs mt-2">&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
