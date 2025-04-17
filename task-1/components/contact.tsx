"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Send } from "lucide-react"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="contact" className="py-24 md:py-28 bg-[#0a0a0a]/50" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">04.</span> Get In Touch
          </h2>
          <p className="text-gray-400 mt-6 max-w-lg mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my
            best to get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ y }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA] to-[#0a81ab] rounded-lg blur opacity-20"></div>
          <div className="relative bg-[#112240] rounded-lg p-8 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-[#0a192f] border border-gray-800 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-[#64FFDA] transition-colors duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[#0a192f] border border-gray-800 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-[#64FFDA] transition-colors duration-300"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-white mb-2 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-[#0a192f] border border-gray-800 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-[#64FFDA] transition-colors duration-300"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-[#0a192f] border border-gray-800 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-[#64FFDA] transition-colors duration-300"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-[#64FFDA] text-[#64FFDA] rounded-md hover:bg-[#64FFDA]/10 transition-colors duration-300 font-medium overflow-hidden"
                >
                  <span>Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#64FFDA] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
