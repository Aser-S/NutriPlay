"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Apple, Carrot, BeanIcon as Avocado, Banana, ChevronRight, PlayCircle, Salad } from "lucide-react"

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Salad className="h-8 w-8 text-green-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            NutriPlay
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#features" className="text-gray-700 hover:text-green-500 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-700 hover:text-green-500 transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-gray-700 hover:text-green-500 transition-colors">
            Testimonials
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
          </Link>
        </nav>
        <Button variant="ghost" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 relative overflow-hidden">
          {/* Floating food items */}
          {isLoaded && (
            <>
              <motion.div
                className="absolute"
                initial={{ x: -100, y: 100, opacity: 0 }}
                animate={{
                  x: [-100, -80, -90],
                  y: [100, 120, 90],
                  opacity: 0.8,
                  rotate: [0, 10, -10],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Apple className="h-16 w-16 text-red-500" />
              </motion.div>

              <motion.div
                className="absolute right-20 top-40"
                initial={{ x: 100, y: 0, opacity: 0 }}
                animate={{
                  x: [100, 120, 90],
                  y: [0, 20, -20],
                  opacity: 0.8,
                  rotate: [0, -10, 10],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Carrot className="h-16 w-16 text-orange-500" />
              </motion.div>

              <motion.div
                className="absolute left-1/3 bottom-20"
                initial={{ x: 0, y: 100, opacity: 0 }}
                animate={{
                  x: [0, 20, -20],
                  y: [100, 80, 120],
                  opacity: 0.8,
                  rotate: [0, 15, -15],
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Avocado className="h-16 w-16 text-green-600" />
              </motion.div>

              <motion.div
                className="absolute right-1/4 top-20"
                initial={{ x: 50, y: -100, opacity: 0 }}
                animate={{
                  x: [50, 70, 30],
                  y: [-100, -80, -120],
                  opacity: 0.8,
                  rotate: [0, -20, 20],
                }}
                transition={{
                  duration: 9,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Banana className="h-16 w-16 text-yellow-500" />
              </motion.div>
            </>
          )}

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                {/* // EDIT HERE: Main slogan */}
                Eat Smart. Live Strong. Play Your Way to Health.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* // EDIT HERE: Subtitle description */}
              Transform your nutrition journey into an exciting game. Track meals, earn rewards, and achieve your health
              goals while having fun!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-full text-lg">
                  Try Demo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6 rounded-full text-lg"
                >
                  See How It Works
                  <PlayCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* // EDIT HERE: Feature cards */}
              <FeatureCard
                icon={<img src="/placeholder.svg?height=64&width=64" alt="Food Logging" className="h-16 w-16" />}
                title="Smart Food Logging"
                description="Log your meals manually or with image recognition. Get instant nutritional insights."
              />
              <FeatureCard
                icon={<img src="/placeholder.svg?height=64&width=64" alt="Meal Planning" className="h-16 w-16" />}
                title="Personalized Meal Plans"
                description="Receive customized weekly meal plans based on your preferences and dietary needs."
              />
              <FeatureCard
                icon={<img src="/placeholder.svg?height=64&width=64" alt="Gamification" className="h-16 w-16" />}
                title="Fun Challenges & Rewards"
                description="Complete nutrition challenges, earn badges, and compete with friends."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-green-500 to-orange-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* // EDIT HERE: Steps */}
                <StepCard
                  number={1}
                  title="Create Your Profile"
                  description="Sign up and set your health goals, dietary preferences, and restrictions."
                />
                <StepCard
                  number={2}
                  title="Log Your Meals"
                  description="Track what you eat manually or by taking a photo of your meal."
                />
                <StepCard
                  number={3}
                  title="Get Personalized Plans"
                  description="Receive weekly meal plans tailored to your preferences and nutritional needs."
                />
                <StepCard
                  number={4}
                  title="Complete Challenges"
                  description="Participate in daily and weekly challenges to improve your eating habits."
                />
                <StepCard
                  number={5}
                  title="Track Your Progress"
                  description="Monitor your nutrition journey with detailed analytics and insights."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* // EDIT HERE: Testimonials */}
              <TestimonialCard
                quote="NutriPlay transformed how my family approaches healthy eating. The kids love earning badges!"
                author="Sarah J."
                role="Mother of two"
              />
              <TestimonialCard
                quote="As a nutritionist, I recommend this app to all my clients. The gamification aspect keeps them engaged."
                author="Dr. Michael T."
                role="Certified Nutritionist"
              />
              <TestimonialCard
                quote="Managing my diabetes has become so much easier with the personalized meal plans and nutrition tracking."
                author="Robert L."
                role="Type 2 Diabetes Patient"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Nutrition Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who have made healthy eating fun and sustainable with NutriPlay.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100 px-8 py-6 rounded-full text-lg">
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Salad className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">NutriPlay</span>
              </div>
              <p className="text-gray-400">Making nutrition fun and engaging for everyone.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-green-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-gray-400 hover:text-green-400 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-400 hover:text-green-400 transition-colors">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">support@nutriplay.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} NutriPlay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

// Component for how it works steps
function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
      whileHover={{ y: -5 }}
    >
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </motion.div>
  )
}
