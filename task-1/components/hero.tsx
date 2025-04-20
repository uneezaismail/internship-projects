"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        
        const width = canvas?.width || window.innerWidth
        const height = canvas?.height || window.innerHeight

        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = "#64FFDA"
      }

      update() {
      
        const width = canvas?.width || window.innerWidth
        const height = canvas?.height || window.innerHeight

        this.x += this.speedX
        this.y += this.speedY

        if (this.x > width) this.x = 0
        else if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        else if (this.y < 0) this.y = height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

   
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(window.innerWidth / 10, 100)
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

       
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.2
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section className="relative min-h-screen lg:pt-20 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-12 md:pt-0">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base font-mono mb-5 text-[#64FFDA]"
          >
            Hi, my name is
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight"
          >
            Uneeza Ismail.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-400 leading-tight"
          >
            I turn ideas into interactive, scalable web solutions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl"
          >
            I&apos;m a full-stack web developer specializing in crafting exceptional, user-driven digital experiences. Currently, I&apos;m focused on building intuitive, scalable solutions with a passion for {" "}
            <a href="#" className="text-[#64FFDA] hover:underline">
            innovation
            </a>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-[#64FFDA] text-[#64FFDA] rounded-md hover:bg-[#64FFDA]/10 transition-colors duration-300 font-medium overflow-hidden"
            >
              <span>View My Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#64FFDA] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="#contact"
              className="group relative px-8 py-4 bg-[#64FFDA]/10 text-[#64FFDA] rounded-md hover:bg-[#64FFDA]/20 transition-colors duration-300 font-medium"
            >
              Contact Me
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#64FFDA] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-6 h-10 border-2 border-[#64FFDA] rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-1 h-2 bg-[#64FFDA] rounded-full mt-2"
          ></motion.div>
        </div>
        <span className="text-[#64FFDA] text-xs mt-2 font-mono">Scroll</span>
      </motion.div>
    </section>
  )
}
