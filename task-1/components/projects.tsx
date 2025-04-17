"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"],
  // })

  const projects = [
    {
      title: "OAK&TEAK E-Commerce marketplace",
      description:
        "A user-friendly e-commerce platform for furniture with product management, secure checkout, and order tracking.",
      image:
        "/ecommerce-website.png",
      technologies: ["Next.js", "TypeScript", "Sanity CMS", "Stripe", "Tailwind CSS"],
      github: "https://github.com/uneezaismail/ecommerce-hackathon",
      external: "https://ecommerce-hackathon-five.vercel.app/",
    },
    {
      title: "Businessly Blog Website",
      description:
        "A blog platform with categories like stock market, health, and beauty. Features include post listings, a comment section, and a responsive design.",
      image:
        "/businessly.png",
      technologies: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS"],
      github: "https://github.com/uneezaismail/sanity-blog-milestone",
      external: "https://sanity-blog-milestone-two.vercel.app/",
    }
,    
{
  title: "Bloom & Beauty",
  description:
    "A responsive beauty blog platform featuring curated articles, a commenting system, and custom CMS for easy content updates.",
  image:
    "/bloom-n-beauty.png",
  technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
  github: "https://github.com/uneezaismail/blog-milestone",
  external: "https://blog-milestone.vercel.app/",
}
,
{
  title: "Carvilla",
  description:
    "An e-commerce website for buying cars online. Includes a product listing page, detailed car pages, and cart functionality for a smooth shopping experience.",
  image:
    "/carvilla.png",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  github: "https://github.com/uneezaismail/milestone-3-ecommerce",
  external: "https://milestone-3-ecommerce-lyart.vercel.app/",
}
,
{
  title: "Agenone Agency Website",
  description:
    "A modern digital agency website showcasing services like UI/UX design and development. Features recent projects, achievements, and client trust with a sleek design.",
  image:
    "/agenone.png",
  technologies: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/uneezaismail/internship-projects/tree/main/task-3",
  external: "https://internship-projects-rust.vercel.app/",
}
,
{
  title: "PearlVista",
  description:
    "A professional interior design website showcasing elegant transformations of homes and offices. It features service listings, a portfolio, client testimonials, and a contact booking system.",
  image:
    "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
  technologies: ["Next.js", "Tailwind CSS", "Figma"],
  github: "https://github.com/uneezaismail/interior-design",
  external: "https://interior-design-dun.vercel.app/",
}
,
  ];
  
  

  const [projectsInView, setProjectsInView] = useState(projects.map(() => false))
  const projectRefs = useRef(projects.map(() => useRef(null)))
  const observerOptions = {
    threshold: 0.1,
  }

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProjectsInView((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        })
      }, observerOptions)
    })

    projectRefs.current.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="projects" className="py-24 md:pt-28" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">03.</span> My Work
          </h2>
          <div className="h-px bg-gray-800 flex-grow ml-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={index}
                ref={projectRefs.current[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                className="group bg-[#112240] rounded-lg overflow-hidden hover:translate-y-[-10px] transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-[#64FFDA]/20 z-10 mix-blend-screen opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-[#112240] opacity-80 group-hover:opacity-0 transition-opacity duration-300 z-0"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors duration-300">
                    <a href={project.external} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4 border-t border-gray-800 pt-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-gray-400 text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
                        aria-label="GitHub Repository"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.external}
                        className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300"
                        aria-label="Live Demo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="https://github.com/uneezaismail"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#64FFDA] text-[#64FFDA] rounded-md hover:bg-[#64FFDA]/10 transition-colors duration-300 font-medium"
          >
            <span>View More Projects</span>
            <ExternalLink size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
