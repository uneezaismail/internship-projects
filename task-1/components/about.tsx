"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <section id="about" className="py-24 md:pt-28" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">01.</span> About Me
          </h2>
          <div className="h-px bg-gray-800 flex-grow ml-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            <div className="space-y-4 text-gray-400">
            <p>
  Hello! I&apos;m Uneeza, a web developer with a passion for building digital experiences. My journey started with experimenting on websites, where I quickly learned the ins and outs of HTML, CSS, and JavaScript.
</p>

<p>
  Fast-forward to today, and I&apos;ve had the privilege of working on various projects, including{" "}
  <span className="text-[#64FFDA]">e-commerce websites</span>,{" "}
  <span className="text-[#64FFDA]">interactive UIs</span>, and{" "}
  <span className="text-[#64FFDA]">AI integrations</span>. My main focus these days is building responsive, accessible, and performance-optimized digital experiences.
</p>
<p>
  I&apos;m also currently working on enhancing my skills with{" "}
  <a href="#" className="text-[#64FFDA] hover:underline">
    Next.js
  </a>{" "}
  and exploring{" "}  
  <span className="text-[#64FFDA]">Python</span> to build smarter applications, including AI-driven projects and automation.
</p>



              <div className="pt-4">
                <h3 className="text-white font-semibold mb-3">Technologies I&apos;ve been working with recently:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Sanity CMS",
                    "Python",
                    "Git/GitHub",
                    "Node.js",
                    "Figma",
                    "Responsive Design",
                    "Performance Optimization",
                  ].map((tech) => (
                    <div key={tech} className="flex items-center">
                      <div className="text-[#64FFDA] mr-2">▹</div>
                      <span className="text-gray-400 text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-lg bg-[#64FFDA]/20 blur-lg opacity-0 group-hover:opacity-100 transition duration-700 group-hover:duration-200"></div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden border-2 border-[#64FFDA]/20 group-hover:border-[#64FFDA]/50 transition duration-300">
                  <div className="absolute inset-0 bg-[#64FFDA]/10 z-10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <Image
                    src="/about.avif"
                    alt="Coding workspace"
                    width={600}
                    height={600}
                    className="object-cover aspect-square transition-transform duration-300 group-hover:scale-105 group-hover:filter group-hover:brightness-110"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
