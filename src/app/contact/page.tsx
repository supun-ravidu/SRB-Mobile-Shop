"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Facebook,
  Globe,
  Headphones,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react"

import { mockProducts } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// ─── Contact page images ────────────────────────────────────
const contactImg = {
  hero: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=600&fit=crop",
  support: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
  callCenter: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop",
  map: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=400&fit=crop",
  happyCustomer: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  teamWork: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
  store1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  store2: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
  store3: "https://images.unsplash.com/photo-1528698827591-e19cef51a699?w=600&h=400&fit=crop",
  whatsapp: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop",
  delivery: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop",
}

// ─── FAQ data ────────────────────────────────────────────────
const faqs = [
  {
    q: "What are your delivery timelines?",
    a: "Metro cities: 1-2 business days. Tier-2 cities: 2-4 days. Rest of India: 4-7 days. Same-day delivery available in Mumbai & Pune for orders before 2 PM.",
  },
  {
    q: "Do you sell 100% genuine products?",
    a: "Absolutely! Every product comes with official brand warranty, GST invoice, and authenticity certificate. We are authorized retailers for all 17 brands.",
  },
  {
    q: "What is your return policy?",
    a: "7-day no-questions-asked returns on all products. 30-day exchange policy. Refund processed within 3-5 business days after pickup.",
  },
  {
    q: "How does your trade-in program work?",
    a: "Share your old device details on WhatsApp or our website. Get instant valuation. Ship it free or drop at our store. Get credit applied to your new purchase!",
  },
  {
    q: "Do you offer EMI options?",
    a: "Yes! No-cost EMI available on all major credit cards for 3, 6, 9, and 12 months. Bajaj Finserv, ZestMoney, and Snapmint also supported.",
  },
  {
    q: "Are refurbished products reliable?",
    a: "Our certified refurbished devices undergo 32-point quality checks. They come with 6-month warranty, original accessories, and 7-day return window.",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      toast({
        title: "Message Sent! ✅",
        description: "We'll get back to you within 2 hours.",
      })
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactImg.hero}
            alt="Contact SRB Mobile Shop"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-indigo-900/80 to-violet-900/70" />
        </div>
        {/* Floating product images */}
        <div className="absolute inset-0 overflow-hidden">
          {mockProducts.slice(0, 6).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40, rotate: -8 + i * 4 }}
              animate={{ opacity: 0.1, y: 0, rotate: -4 + i * 2 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.9 }}
              className="absolute hidden lg:block"
              style={{
                top: `${8 + (i % 3) * 30}%`,
                right: `${2 + i * 6}%`,
                width: "90px",
                height: "90px",
              }}
            >
              <img
                src={p.image}
                alt=""
                className="size-full rounded-2xl object-cover shadow-2xl"
              />
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl space-y-6"
          >
            <Badge className="border-0 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <Headphones className="mr-1.5 size-4" />
              24/7 SUPPORT • ALWAYS HERE FOR YOU
            </Badge>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
                Touch
              </span>
              <br />
              With Us
            </h1>
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">
              Questions about a product? Need help with an order? Our team of
              mobile experts responds within 2 hours — guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Phone, label: "+91 98765 43210" },
                { icon: Mail, label: "hello@srbmobile.in" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                >
                  <item.icon className="size-4 text-cyan-300" />
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            className="fill-zinc-50 dark:fill-zinc-950"
          >
            <path d="M0,60 C360,100 720,20 1080,70 C1260,90 1380,40 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ Quick Contact Cards ═══ */}
      <section className="mx-auto -mt-6 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              title: "Call Us",
              value: "+91 98765 43210",
              sub: "Mon-Sun, 24/7",
              color:
                "from-blue-500 to-cyan-500",
              image: contactImg.callCenter,
            },
            {
              icon: MessageCircle,
              title: "WhatsApp",
              value: "+91 98765 43210",
              sub: "Avg. reply: 5 min",
              color:
                "from-green-500 to-emerald-500",
              image: contactImg.whatsapp,
            },
            {
              icon: Mail,
              title: "Email Us",
              value: "hello@srbmobile.in",
              sub: "Response in 2 hrs",
              color:
                "from-violet-500 to-purple-500",
              image: contactImg.support,
            },
            {
              icon: MapPin,
              title: "Visit Store",
              value: "Bandra West, Mumbai",
              sub: "10 AM - 9 PM",
              color:
                "from-orange-500 to-red-500",
              image: contactImg.store1,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Card className="relative overflow-hidden border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-900">
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t opacity-80",
                      card.color
                    )}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <card.icon className="size-10 text-white drop-shadow-lg" />
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-base font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Contact Form + Map ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-5">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden border-0 bg-white shadow-2xl dark:bg-zinc-900">
              {/* Form Header with image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={contactImg.teamWork}
                  alt="Our Team"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60" />
                <div className="absolute bottom-4 left-6 right-6">
                  <Badge className="mb-2 border-0 bg-primary/10 text-primary backdrop-blur-sm">
                    <Send className="mr-1.5 size-3.5" />
                    SEND US A MESSAGE
                  </Badge>
                  <h2 className="text-2xl font-black md:text-3xl">
                    We&apos;d Love to Hear from You
                  </h2>
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                      >
                        <CheckCircle2 className="size-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-black">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        Our team will get back to you within 2 hours. Check your
                        email for a confirmation.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-semibold">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((d) => ({
                                ...d,
                                name: e.target.value,
                              }))
                            }
                            required
                            className="border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-semibold">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((d) => ({
                                ...d,
                                email: e.target.value,
                              }))
                            }
                            required
                            className="border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-semibold">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((d) => ({
                                ...d,
                                phone: e.target.value,
                              }))
                            }
                            className="border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="font-semibold">
                            Subject *
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(v) =>
                              setFormData((d) => ({ ...d, subject: v }))
                            }
                          >
                            <SelectTrigger className="border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order">
                                📦 Order Inquiry
                              </SelectItem>
                              <SelectItem value="product">
                                📱 Product Question
                              </SelectItem>
                              <SelectItem value="return">
                                🔄 Return / Exchange
                              </SelectItem>
                              <SelectItem value="tradein">
                                ♻️ Trade-In
                              </SelectItem>
                              <SelectItem value="warranty">
                                🛡️ Warranty Claim
                              </SelectItem>
                              <SelectItem value="bulk">
                                🏢 Bulk / Corporate Order
                              </SelectItem>
                              <SelectItem value="feedback">
                                💬 Feedback / Suggestion
                              </SelectItem>
                              <SelectItem value="other">
                                ✨ Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-semibold">
                          Your Message *
                        </Label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((d) => ({
                              ...d,
                              message: e.target.value,
                            }))
                          }
                          required
                          className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-zinc-700 dark:bg-zinc-800"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-violet-600 font-bold sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="mr-2 size-4 rounded-full border-2 border-white/30 border-t-white"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 size-4" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        By submitting, you agree to our privacy policy. We
                        won&apos;t spam you — promise! 💛
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Support Info */}
            <Card className="overflow-hidden border-0 bg-white shadow-lg dark:bg-zinc-900">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={contactImg.support}
                  alt="24/7 Support"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-lg font-black">Why Contact Us?</h3>
                </div>
              </div>
              <CardContent className="space-y-3 p-5 pt-2">
                {[
                  {
                    icon: Headphones,
                    text: "24/7 expert support team",
                    color: "text-blue-500",
                  },
                  {
                    icon: Clock,
                    text: "Average response: 2 hours",
                    color: "text-green-500",
                  },
                  {
                    icon: Globe,
                    text: "Hindi, English, Marathi support",
                    color: "text-violet-500",
                  },
                  {
                    icon: ShieldCheck,
                    text: "Secure & confidential",
                    color: "text-amber-500",
                  },
                  {
                    icon: Heart,
                    text: "99.2% satisfaction rate",
                    color: "text-rose-500",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800"
                  >
                    <item.icon className={cn("size-4 shrink-0", item.color)} />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 bg-gradient-to-br from-primary to-violet-600 text-white shadow-lg">
              <CardContent className="space-y-4 p-5">
                <h3 className="text-lg font-black">Quick Actions</h3>
                {[
                  {
                    icon: ShoppingBag,
                    label: "Track My Order",
                    href: "/shop",
                  },
                  {
                    icon: Smartphone,
                    label: "Browse Products",
                    href: "/shop",
                  },
                  {
                    icon: Zap,
                    label: "View Today's Deals",
                    href: "/deals",
                  },
                  {
                    icon: Building2,
                    label: "About SRB",
                    href: "/about",
                  },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-all hover:bg-white/20"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                    <ArrowRight className="ml-auto size-4" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 bg-white shadow-lg dark:bg-zinc-900">
              <CardContent className="p-5">
                <h3 className="mb-4 text-lg font-black">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Instagram,
                      label: "Instagram",
                      handle: "@srbmobile",
                      color:
                        "from-pink-500 to-violet-500",
                      followers: "25K",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter / X",
                      handle: "@srbmobile",
                      color:
                        "from-blue-400 to-cyan-500",
                      followers: "12K",
                    },
                    {
                      icon: Facebook,
                      label: "Facebook",
                      handle: "SRB Mobile",
                      color:
                        "from-blue-600 to-blue-500",
                      followers: "40K",
                    },
                    {
                      icon: Youtube,
                      label: "YouTube",
                      handle: "SRB Mobile",
                      color:
                        "from-red-600 to-red-500",
                      followers: "8K",
                    },
                  ].map((social) => (
                    <button
                      key={social.label}
                      className="group relative overflow-hidden rounded-xl border bg-zinc-50 p-3 text-left transition-all hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10",
                          social.color
                        )}
                      />
                      <social.icon className="mb-2 size-5 text-muted-foreground group-hover:text-foreground" />
                      <p className="text-xs font-bold">{social.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {social.followers} followers
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ═══ Our Locations ═══ */}
      <section className="bg-white py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
              <MapPin className="mr-1.5 size-4" />
              OUR LOCATIONS
            </Badge>
            <h2 className="text-3xl font-black md:text-4xl">
              Visit Our Experience Stores
            </h2>
            <p className="mt-2 text-muted-foreground">
              Touch, feel, and experience devices in person before you buy
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                city: "Mumbai",
                tag: "Flagship Store",
                address:
                  "SRB Mobile Shop, Ground Floor, Crystal Plaza, Linking Road, Bandra West, Mumbai 400050",
                phone: "+91 98765 43210",
                email: "mumbai@srbmobile.in",
                timing: "10:00 AM - 9:00 PM, Mon-Sun",
                image: contactImg.store1,
                features: [
                  "Live Device Testing",
                  "Expert Consultation",
                  "Instant Trade-In",
                  "Same-Day Pickup",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                city: "Pune",
                tag: "Experience Center",
                address:
                  "SRB Mobile, 2nd Floor, SGS Mall, FC Road, Shivajinagar, Pune 411005",
                phone: "+91 98765 43211",
                email: "pune@srbmobile.in",
                timing: "10:00 AM - 8:00 PM, Mon-Sat",
                image: contactImg.store2,
                features: [
                  "VR Phone Preview",
                  "Accessory Studio",
                  "Free Screen Guard",
                  "Device Setup Help",
                ],
                color: "from-violet-500 to-purple-500",
              },
              {
                city: "Bangalore",
                tag: "Coming March 2026",
                address:
                  "SRB Mobile, MG Road, Near Trinity Metro Station, Bangalore 560001",
                phone: "+91 98765 43212",
                email: "bangalore@srbmobile.in",
                timing: "Opening March 2026",
                image: contactImg.store3,
                features: [
                  "AI Recommendation Kiosk",
                  "Repair Center",
                  "Trade-In Counter",
                  "Café Lounge",
                ],
                color: "from-amber-500 to-orange-500",
              },
            ].map((store, i) => (
              <motion.div
                key={store.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-0 bg-white shadow-xl transition-all hover:shadow-2xl dark:bg-zinc-800">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={store.image}
                      alt={`SRB ${store.city}`}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t to-transparent opacity-60",
                        store.color
                      )}
                    />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="mb-1 border-0 bg-white/90 font-bold text-zinc-900 shadow-lg dark:bg-zinc-900 dark:text-white">
                        {store.tag}
                      </Badge>
                      <h3 className="text-2xl font-black text-white drop-shadow-lg">
                        {store.city}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="space-y-4 p-5">
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                        {store.address}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="size-4 shrink-0 text-primary" />
                        {store.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4 shrink-0 text-primary" />
                        {store.email}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4 shrink-0 text-primary" />
                        {store.timing}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {store.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-2.5 py-1.5 text-xs font-medium dark:bg-zinc-700"
                        >
                          <Sparkles className="size-3 text-primary" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 size-4" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Map Banner ═══ */}
      <section className="relative">
        <div className="relative h-64 overflow-hidden md:h-80">
          <img
            src={contactImg.map}
            alt="Our Location Map"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/30 dark:from-zinc-950 dark:to-zinc-950/30" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex size-16 items-center justify-center rounded-full bg-primary shadow-2xl"
              >
                <MapPin className="size-8 text-white" />
              </motion.div>
              <div className="rounded-xl bg-white/90 px-4 py-2 text-center shadow-xl backdrop-blur-sm dark:bg-zinc-800/90">
                <p className="text-sm font-bold">SRB Mobile Shop</p>
                <p className="text-xs text-muted-foreground">
                  Bandra West, Mumbai
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ Section ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
              <MessageSquare className="mr-1.5 size-4" />
              FAQ
            </Badge>
            <h2 className="mb-2 text-3xl font-black md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mb-8 text-muted-foreground">
              Quick answers to common queries. Can&apos;t find what you need?
              Reach out!
            </p>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card
                    className={cn(
                      "cursor-pointer border-0 bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900",
                      openFaq === i && "ring-2 ring-primary/30 shadow-lg"
                    )}
                    onClick={() =>
                      setOpenFaq(openFaq === i ? null : i)
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold">{faq.q}</h4>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                        >
                          <span className="text-lg font-bold leading-none">
                            +
                          </span>
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pt-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side — image + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={contactImg.happyCustomer}
                alt="Happy Customer"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
              <CardContent className="space-y-4 p-6">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <MessageCircle className="size-7" />
                </div>
                <h3 className="text-xl font-black">
                  Still Have Questions?
                </h3>
                <p className="text-sm text-white/80">
                  Our experts are just a WhatsApp message away. Get instant
                  answers with photos and videos — no hold times!
                </p>
                <Button className="w-full bg-white font-bold text-emerald-700 hover:bg-white/90">
                  <MessageCircle className="mr-2 size-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 bg-white shadow-lg dark:bg-zinc-900">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={contactImg.delivery}
                  alt="Fast Delivery"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-violet-600/80" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div>
                    <p className="text-2xl font-black">Free Delivery</p>
                    <p className="text-sm text-white/80">
                      On all orders above ₹999
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ═══ Support Hours Visual ═══ */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16 dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-black md:text-4xl">
              Support Availability
            </h2>
            <p className="mt-2 text-muted-foreground">
              Multiple ways to reach us, any time of day
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                channel: "Phone Support",
                icon: Phone,
                hours: "24 hours, 7 days a week",
                response: "Instant",
                image: contactImg.callCenter,
                gradient: "from-blue-600 to-cyan-600",
                langs: "English, Hindi, Marathi",
              },
              {
                channel: "WhatsApp",
                icon: MessageCircle,
                hours: "24 hours, 7 days a week",
                response: "Under 5 minutes",
                image: contactImg.whatsapp,
                gradient: "from-green-600 to-emerald-600",
                langs: "English, Hindi",
              },
              {
                channel: "Email Support",
                icon: Mail,
                hours: "Monitored 24/7",
                response: "Within 2 hours",
                image: contactImg.office,
                gradient: "from-violet-600 to-purple-600",
                langs: "English, Hindi, Marathi",
              },
            ].map((channel, i) => (
              <motion.div
                key={channel.channel}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-800">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={channel.image}
                      alt={channel.channel}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t to-transparent opacity-70",
                        channel.gradient
                      )}
                    />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
                        <channel.icon className="size-6 text-white" />
                      </div>
                      <h3 className="text-lg font-black text-white drop-shadow-lg">
                        {channel.channel}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-primary" />
                      <span className="text-sm font-medium">
                        {channel.hours}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="size-4 text-amber-500" />
                      <span className="text-sm">
                        Avg. response:{" "}
                        <strong>{channel.response}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        {channel.langs}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        Online now
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Newsletter + Final CTA ═══ */}
      <section className="relative overflow-hidden bg-zinc-900 py-20 dark:bg-zinc-800">
        <div className="absolute inset-0 overflow-hidden">
          {mockProducts.slice(10, 18).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.05 }}
              viewport={{ once: true }}
              className="absolute"
              style={{
                top: `${(i % 4) * 25}%`,
                left: `${i * 12}%`,
                width: "70px",
                height: "70px",
              }}
            >
              <img
                src={p.image}
                alt=""
                className="size-full rounded-xl object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4">
              <Mail className="size-8 text-cyan-400" />
            </div>
            <h2 className="mb-3 text-3xl font-black text-white md:text-4xl">
              Stay Connected
            </h2>
            <p className="mb-8 text-white/60">
              Subscribe for exclusive deals, new product launches, and insider
              tips from our mobile experts.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none sm:w-80"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:from-cyan-600 hover:to-blue-700"
              >
                <Send className="mr-2 size-4" />
                Subscribe
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-green-400" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-green-400" />
                Weekly deals digest
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-green-400" />
                Unsubscribe anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Trust Badges ═══ */}
      <section className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Genuine Products",
                desc: "100% authentic guarantee",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Always here for you",
              },
              {
                icon: Star,
                title: "4.8★ Rating",
                desc: "50,000+ happy customers",
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "By SRB Mobile Shop",
              },
            ].map((badge) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <badge.icon className="size-6" />
                </div>
                <h4 className="text-sm font-bold">{badge.title}</h4>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
