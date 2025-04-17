"use client"

import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-24 h-24"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            cx="50"
            cy="50"
            r="40"
            stroke="#64FFDA"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_#64FFDA]"
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          className="absolute inset-0 flex items-center justify-center text-[#64FFDA] font-mono text-sm"
        >
          DEV
        </motion.div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-gray-400 font-mono text-sm"
      >
        Building experience...
      </motion.p>
    </div>
  )
}
