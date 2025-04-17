"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Server, Layout, Figma, GitBranch, Cpu, Palette, Zap, FileCode, Terminal } from "lucide-react"

export default function Skills() {
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

  // Group skills by category
  const skillCategories = {
    "Frontend Development": [
      { name: "HTML/CSS", icon: <Palette className="w-5 h-5" /> },
      { name: "JavaScript", icon: <FileCode className="w-5 h-5" /> },
      { name: "TypeScript", icon: <Code className="w-5 h-5" /> },
      { name: "React", icon: <Cpu className="w-5 h-5" /> },
      { name: "Next.js", icon: <Zap className="w-5 h-5" /> },
    ],
    "Backend & CMS": [
      { name: "Sanity CMS", icon: <Database className="w-5 h-5" /> },
      { name: "Node.js", icon: <Terminal className="w-5 h-5" /> },
      { name: "Python", icon: <Server className="w-5 h-5" /> },
    ],
    "Tools & Best Practices": [
      { name: "Git/GitHub", icon: <GitBranch className="w-5 h-5" /> },
      { name: "Figma", icon: <Figma className="w-5 h-5" /> },
      { name: "Responsive Design", icon: <Layout className="w-5 h-5" /> },
      { name: "Performance Optimization", icon: <Zap className="w-5 h-5" /> },
    ],
  }

  return (
    <section id="skills" className="py-24 md:pt-28 bg-[#0a0a0a]/50" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">02.</span> Skills
          </h2>
          <div className="h-px bg-gray-800 flex-grow ml-4"></div>
        </motion.div>

        {/* Skills Section */}
        <div className="space-y-12">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              className="relative"
            >
              <div className="mb-4 flex items-center">
                <h3 className="text-lg font-semibold text-white">{category}</h3>
                <div className="h-px bg-gray-800 flex-grow ml-4"></div>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.1 * index + 0.2 * categoryIndex }}
                    className="group"
                  >
                    <div className="flex items-center bg-[#112240]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:border-[#64FFDA]/50 transition-all duration-300">
                      <span className="text-[#64FFDA] mr-2">{skill.icon}</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
