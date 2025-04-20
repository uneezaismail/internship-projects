"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    { icon: <Github size={18} />, url: "https://github.com/uneezaismail", label: "GitHub" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com/in/uneeza-ismail", label: "LinkedIn" },
    { icon: <Twitter size={18} />, url: "#", label: "Twitter" },
    { icon: <Mail size={18} />, url: "#", label: "Email" },
  ]

  return (
    <>
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed left-6 bottom-0 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center">
          <div className="space-y-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 hover:-translate-y-1 transform block"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="w-px h-24 bg-gray-600 mt-6"
          ></motion.div>
        </div>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed right-6 bottom-0 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center">
          <motion.a
            href="mailto:hello@example.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 font-mono text-xs tracking-widest [writing-mode:vertical-rl]"
          >
            uneezaismail@gmail.com
          </motion.a>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="w-px h-24 bg-gray-600 mt-6"
          ></motion.div>
        </div>
      </motion.div>

   
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-10 lg:hidden bg-[#0a0a0a]/80 backdrop-blur-md border-t border-gray-800"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-center items-center space-x-2">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                aria-label={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 p-2"
              >
                {link.icon}
              </motion.a>
            ))}
            <motion.a
              href="mailto:hello@example.com"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 font-mono text-xs p-2"
            >
              uneezaismail@gmail.com
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  )
}
