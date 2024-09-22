'use client'
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const features = [
  { 
    title: "Instant JavaScript Unit Tests", 
    description: "Upload your code, and our AI will generate well-structured tests in seconds.",
    image: "/feature1.jpg"
  },
  { 
    title: "Effortless Integration", 
    description: "Seamlessly plug into your existing Jest or Mocha setup.",
    image: "/feature2.jpg"
  },
  { 
    title: "Cut Down Development Time", 
    description: "Reduce manual test writing time and ship faster without sacrificing quality.",
    image: "/feature3.jpg"
  }
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [activeFeature, setActiveFeature] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveFeature(Number(entry.target.id))
          }
        })
      },
      { threshold: 0.5 }
    )

    const featureElements = featuresRef.current?.children
    if (featureElements) {
      Array.from(featureElements).forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen  dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB]">
 
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-12 sm:py-16 md:py-24 space-y-6 sm:space-y-8 md:space-y-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">AI-Powered Jest Test <span className="text-[#3B82F6] dark:text-[#60A5FA]">Generation</span></h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#4B5563] dark:text-[#E5E7EB] max-w-4xl mx-auto">
            Revolutionize your JavaScript testing workflow. Upload your code and let our AI create comprehensive Jest tests in seconds.
          </p>
          <Link href="/auth?view=signup">
            <Button className="bg-[#3B82F6] mt-6 hover:bg-[#1E3A8A] dark:bg-[#60A5FA] dark:hover:bg-[#3B82F6] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Start for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section id="features" className="py-12 sm:py-16 md:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">Key Features</h2>
          <div ref={featuresRef} className="space-y-16 sm:space-y-24 md:space-y-32">
            {features.map((feature, index) => (
              <div 
                key={index} 
                id={index.toString()}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
              >
                <div className="w-full md:w-1/2">
                  <Image src={feature.image} alt={feature.title} width={600} height={400} className="rounded-xl shadow-lg w-full" />
                </div>
                <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">{feature.title}</h3>
                  <p className="text-lg sm:text-xl text-[#4B5563] dark:text-[#E5E7EB]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-12 sm:py-16 md:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
            {[
              { step: 1, title: "Upload Code", description: "Simply upload your JavaScript or TypeScript files." },
              { step: 2, title: "AI Analysis", description: "Our AI analyzes your code structure and dependencies." },
              { step: 3, title: "Generate Tests", description: "Comprehensive Jest tests are generated instantly." }
            ].map((step, index) => (
              <div key={index} className="relative bg-[#F3F4F6] dark:bg-[#1E3A8A] p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-[#3B82F6] dark:bg-[#60A5FA] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">{step.step}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 mt-6 sm:mt-8 text-[#1E3A8A] dark:text-[#60A5FA]">{step.title}</h3>
                <p className="text-base sm:text-lg text-[#4B5563] dark:text-[#E5E7EB]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#3B82F6] dark:bg-[#1E3A8A] rounded-lg p-8 sm:p-12 md:p-16 text-center my-12 sm:my-16 md:my-24 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Get TestGenius</h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto">Start boosting your testing workflow with our AI-powered solution. Sign up for early access and revolutionize your development process.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-3xl mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="rounded-md bg-white dark:bg-[#0A1930] text-[#1E3A8A] dark:text-white border-2 border-white dark:border-[#60A5FA] px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-2/3 h-12 sm:h-14" 
            />
            <Button className="bg-white hover:bg-[#F3F4F6] text-[#1E3A8A] dark:bg-[#60A5FA] dark:hover:bg-[#3B82F6] dark:text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-all duration-200 w-full sm:w-auto h-12 sm:h-14">
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {[
              { question: "What types of tests does TestGenius generate?", answer: "TestGenius generates unit tests, integration tests, and snapshot tests tailored for Jest and React Testing Library." },
              { question: "How accurate are the generated tests?", answer: "Our AI-generated tests typically achieve over 80% code coverage, but we recommend reviewing and adjusting them as needed for your specific use case." },
              { question: "Is my code secure when using TestGenius?", answer: "Absolutely. All processing is done locally on your machine. Your code is never sent to our servers or stored anywhere outside your local environment." },
              { question: "What programming languages are supported?", answer: "Currently, TestGenius supports JavaScript and TypeScript, with a focus on React applications and Node.js backends." }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="bg-[#F3F4F6] dark:bg-[#1E3A8A] rounded-xl">
                <AccordionTrigger className="text-[#1E3A8A] dark:text-[#60A5FA] hover:text-[#3B82F6] dark:hover:text-white px-4 sm:px-6 text-base sm:text-xl">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#4B5563] dark:text-[#E5E7EB] px-4 sm:px-6 pb-4 text-sm sm:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="bg-[#F3F4F6] dark:bg-[#0A1930] py-8 sm:py-12 mt-12 sm:mt-16 md:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#4B5563] dark:text-[#E5E7EB]">
          <p>&copy; 2023 TestGenius. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}