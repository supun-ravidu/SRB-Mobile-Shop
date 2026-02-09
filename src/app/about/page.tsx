"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Crown,
  Globe,
  HandHeart,
  Headphones,
  Heart,
  MapPin,
  Medal,
  MessageCircle,
  Package,
  Phone,
  Quote,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  Truck,
  Users,
  Zap,
} from "lucide-react"

import { mockProducts, formatPrice } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ─── About page images from Unsplash ────────────────────────
const aboutImg = {
  store: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
  workshop: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop",
  support: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
  delivery: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=500&fit=crop",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
  customers: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
  founder: "https://image2url.com/r2/default/images/1770651481159-c0ac8f97-587b-4b21-94db-4e76e55d68dd.jpeg",
  cofounder: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  cto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  headDesign: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  quality: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop&q=90",
  cityStore1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  cityStore2: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
  cityStore3: "https://images.unsplash.com/photo-1528698827591-e19cef51a699?w=600&h=400&fit=crop",
}

// ─── Stats counter hook ─────────────────────────────────────
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = 0
          const increment = end / (duration / 16)
          let current = start
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

// ─── Animated stat card ──────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  delay,
}: {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  color: string
  delay: number
}) {
  const { count, ref } = useCounter(value)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Card className="border-0 bg-white shadow-lg transition-all hover:shadow-xl dark:bg-zinc-900">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <div className={cn("rounded-2xl p-3", color)}>
            <Icon className="size-6" />
          </div>
          <p className="text-3xl font-black">
            {count.toLocaleString()}
            {suffix}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Team member card ────────────────────────────────────────
function TeamCard({
  name,
  role,
  image,
  bio,
  index,
}: {
  name: string
  role: string
  image: string
  bio: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-900">
        <div className="relative mx-auto mt-6 size-32 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all group-hover:ring-primary/50">
          <img
            src={image}
            alt={name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="space-y-2 p-6 text-center">
          <h3 className="text-lg font-bold">{name}</h3>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary dark:bg-primary/20"
          >
            {role}
          </Badge>
          <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
          <div className="flex justify-center gap-2 pt-2">
            {["LinkedIn", "Twitter"].map((social) => (
              <button
                key={social}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-white dark:bg-zinc-800"
              >
                {social}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Timeline item ───────────────────────────────────────────
function TimelineItem({
  year,
  title,
  description,
  icon: Icon,
  index,
}: {
  year: string
  title: string
  description: string
  icon: React.ElementType
  index: number
}) {
  const isLeft = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex gap-6 pb-10",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Connector line */}
      <div className="absolute left-[23px] top-12 hidden h-full w-0.5 bg-gradient-to-b from-primary/40 to-transparent md:left-1/2 md:-ml-px md:block" />
      {/* Dot */}
      <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-white shadow-lg md:absolute md:left-1/2 md:-ml-6">
        <Icon className="size-5" />
      </div>
      {/* Content */}
      <div
        className={cn(
          "flex-1 rounded-2xl border bg-white p-5 shadow-md dark:bg-zinc-900",
          isLeft ? "md:mr-auto md:w-[calc(50%-3rem)]" : "md:ml-auto md:w-[calc(50%-3rem)]"
        )}
      >
        <Badge className="mb-2 border-0 bg-primary/10 text-primary">
          {year}
        </Badge>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

// ─── Main About Page ─────────────────────────────────────────
export default function AboutPage() {
  const totalProducts = mockProducts.length
  const totalBrands = new Set(mockProducts.map((p) => p.brand)).size

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={aboutImg.store}
            alt="SRB Mobile Shop"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/60" />
        </div>
        {/* Floating phone images */}
        <div className="absolute inset-0 overflow-hidden">
          {mockProducts.slice(0, 5).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60, rotate: -10 + i * 5 }}
              animate={{ opacity: 0.12, y: 0, rotate: -5 + i * 3 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
              className="absolute hidden lg:block"
              style={{
                top: `${10 + i * 16}%`,
                right: `${3 + i * 7}%`,
                width: "100px",
                height: "100px",
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

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl space-y-6"
          >
            <Badge className="border-0 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <Building2 className="mr-1.5 size-4" />
              EST. 2018 • INDIA&apos;S TRUSTED MOBILE DESTINATION
            </Badge>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              About{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent">
                SRB Mobile Shop
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">
              From a single store to India&apos;s most trusted online mobile
              destination. We bring you genuine products, unbeatable prices, and
              a shopping experience you&apos;ll love.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                className="bg-white font-bold text-zinc-900 hover:bg-white/90"
                asChild
              >
                <Link href="/shop">
                  <ShoppingBag className="mr-2 size-5" />
                  Explore Products
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 font-bold text-white hover:bg-white/10"
              >
                <MessageCircle className="mr-2 size-5" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            className="fill-zinc-50 dark:fill-zinc-950"
          >
            <path d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="mx-auto -mt-4 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={Users}
            value={50000}
            suffix="+"
            label="Happy Customers"
            color="text-blue-500 bg-blue-50 dark:bg-blue-950/30"
            delay={0}
          />
          <StatCard
            icon={Smartphone}
            value={totalProducts}
            suffix="+"
            label="Products Available"
            color="text-violet-500 bg-violet-50 dark:bg-violet-950/30"
            delay={0.1}
          />
          <StatCard
            icon={Award}
            value={totalBrands}
            suffix=""
            label="Trusted Brands"
            color="text-amber-500 bg-amber-50 dark:bg-amber-950/30"
            delay={0.2}
          />
          <StatCard
            icon={Star}
            value={4}
            suffix=".8★"
            label="Average Rating"
            color="text-green-500 bg-green-50 dark:bg-green-950/30"
            delay={0.3}
          />
        </div>
      </section>

      {/* ═══ Our Story ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge className="border-0 bg-primary/10 px-4 py-1.5 text-primary">
              <Heart className="mr-1.5 size-4" />
              OUR STORY
            </Badge>
            <h2 className="text-3xl font-black md:text-4xl">
              From a Dream to
              <br />
              <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                India&apos;s #1 Mobile Shop
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                SRB Mobile Shop started in 2018 with a simple mission — to make
                premium smartphones accessible to everyone across India. What
                began as a small store in Mumbai has grown into a nationwide
                trusted destination for mobile devices and accessories.
              </p>
              <p className="leading-relaxed">
                Our founder, <strong>Supun Rathnayaka</strong>, noticed that
                consumers were overpaying for genuine products or compromising
                with fakes. SRB was born to bridge that gap — offering 100%
                authentic devices at the most competitive prices, with a
                customer experience that feels personal and premium.
              </p>
              <p className="leading-relaxed">
                Today, we serve <strong>50,000+ happy customers</strong>,
                partner with <strong>{totalBrands} world-class brands</strong>,
                and deliver to every corner of India with a promise of
                authenticity, speed, and unmatched support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "100% Genuine",
                "Best Prices",
                "Pan-India Delivery",
                "Expert Support",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 px-3 py-1.5"
                >
                  <CheckCircle2 className="mr-1.5 size-3 text-green-500" />
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={aboutImg.store}
                    alt="Our Store"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={aboutImg.support}
                    alt="Customer Support"
                    className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={aboutImg.team}
                    alt="Our Team"
                    className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={aboutImg.warehouse}
                    alt="Warehouse"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 z-10 rounded-2xl bg-white p-4 shadow-2xl dark:bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30">
                  <ThumbsUp className="size-6" />
                </div>
                <div>
                  <p className="text-xl font-black">99.2%</p>
                  <p className="text-xs text-muted-foreground">
                    Customer Satisfaction
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Mission & Vision ═══ */}
      <section className="bg-gradient-to-b from-white to-zinc-50 py-20 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-black md:text-4xl">
              What Drives Us
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our core principles that guide every decision
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 to-violet-700 text-white shadow-2xl">
                <div className="absolute right-0 top-0 opacity-10">
                  <Target className="size-48 -translate-y-12 translate-x-12" />
                </div>
                <CardContent className="relative space-y-4 p-8">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Target className="size-7" />
                  </div>
                  <h3 className="text-2xl font-black">Our Mission</h3>
                  <p className="leading-relaxed text-white/85">
                    To democratize access to premium mobile technology across
                    India. We believe everyone deserves a genuine,
                    high-performance device at a fair price — backed by honest
                    advice and stellar after-sales support.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    {[
                      "Make premium tech affordable for all",
                      "Zero tolerance for counterfeit products",
                      "Human-first customer support",
                      "Bridge the urban-rural tech divide",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 text-green-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xl">
                <div className="absolute right-0 top-0 opacity-10">
                  <Rocket className="size-48 -translate-y-12 translate-x-12" />
                </div>
                <CardContent className="relative space-y-4 p-8">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Rocket className="size-7" />
                  </div>
                  <h3 className="text-2xl font-black">Our Vision</h3>
                  <p className="leading-relaxed text-white/85">
                    To become India&apos;s most loved and trusted mobile retail
                    brand by 2030 — a one-stop ecosystem where discovering,
                    buying, and servicing your devices is seamless and joyful.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    {[
                      "Pan-India same-day delivery by 2027",
                      "AI-powered personalized recommendations",
                      "100 physical experience stores",
                      "Circular economy — buy-back & recycle program",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Sparkles className="size-4 shrink-0 text-yellow-200" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Why Choose Us ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
            <Medal className="mr-1.5 size-4" />
            WHY SRB?
          </Badge>
          <h2 className="text-3xl font-black md:text-4xl">
            What Makes Us Different
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "100% Genuine Products",
              desc: "Every device comes with brand warranty and official invoice. Zero fakes, guaranteed.",
              color: "text-green-500 bg-green-50 dark:bg-green-950/30",
              image: mockProducts[0].image,
            },
            {
              icon: Zap,
              title: "Best Price Guarantee",
              desc: "Found it cheaper elsewhere? We'll match it and give you an extra 5% off. That's our promise.",
              color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
              image: mockProducts[1].image,
            },
            {
              icon: Truck,
              title: "Express Delivery",
              desc: "Free delivery on orders above ₹999. Same-day dispatch for metro cities.",
              color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
              image: aboutImg.delivery,
            },
            {
              icon: Headphones,
              title: "Expert Support 24/7",
              desc: "Our mobile experts are available round the clock — call, chat, or email anytime.",
              color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30",
              image: aboutImg.support,
            },
            {
              icon: Package,
              title: "Easy Returns & Exchange",
              desc: "7-day no-questions-asked returns. 30-day exchange on all devices. Hassle-free.",
              color: "text-rose-500 bg-rose-50 dark:bg-rose-950/30",
              image: mockProducts[6].image,
            },
            {
              icon: HandHeart,
              title: "Trade-in Program",
              desc: "Upgrade smarter — trade your old device for instant credit on your new purchase.",
              color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30",
              image: mockProducts[13].image,
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden border-0 bg-white shadow-md transition-all hover:shadow-2xl dark:bg-zinc-900">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-zinc-900 dark:via-zinc-900/50" />
                  <div
                    className={cn(
                      "absolute bottom-3 left-4 rounded-xl p-2.5 shadow-lg",
                      feature.color
                    )}
                  >
                    <feature.icon className="size-5" />
                  </div>
                </div>
                <CardContent className="space-y-2 p-5 pt-3">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Our Journey / Timeline ═══ */}
      <section className="bg-white py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
              <Clock className="mr-1.5 size-4" />
              OUR JOURNEY
            </Badge>
            <h2 className="text-3xl font-black md:text-4xl">
              The SRB Story — Year by Year
            </h2>
          </motion.div>

          <div className="relative">
            {[
              {
                year: "2018",
                title: "The Beginning",
                description:
                  "SRB Mobile Shop opened its first store in Mumbai with just 5 smartphone brands and a team of 3 passionate people.",
                icon: Building2,
              },
              {
                year: "2019",
                title: "Going Online",
                description:
                  "Launched our e-commerce platform, making premium mobiles accessible to customers across Maharashtra.",
                icon: Globe,
              },
              {
                year: "2020",
                title: "Pan-India Expansion",
                description:
                  "Expanded delivery to all 28 states. Crossed 5,000 orders milestone during the festive season.",
                icon: Truck,
              },
              {
                year: "2021",
                title: "Certified Refurbished Launch",
                description:
                  "Introduced our certified refurbished program — quality-tested pre-owned devices with full warranty.",
                icon: ShieldCheck,
              },
              {
                year: "2022",
                title: "10,000 Customers Strong",
                description:
                  "Hit 10,000 happy customers. Partnered with 12 brands including Apple, Samsung, Google, and OnePlus.",
                icon: Users,
              },
              {
                year: "2023",
                title: "Awards & Recognition",
                description:
                  "Won 'Best Mobile Retailer' award. Launched express same-day delivery in 6 metro cities.",
                icon: Award,
              },
              {
                year: "2024",
                title: "50K+ Customers",
                description:
                  "Crossed 50,000 happy customers. Expanded to 17 premium brands and 50+ products in our catalog.",
                icon: Crown,
              },
              {
                year: "2025",
                title: "AI-Powered Experience",
                description:
                  "Launched AI-based product recommendations, virtual try-on for cases, and smart trade-in valuation.",
                icon: Sparkles,
              },
              {
                year: "2026",
                title: "The Future is Now",
                description:
                  "Opening 10 physical experience stores. Launching subscription plans and device-as-a-service model.",
                icon: Rocket,
              },
            ].map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Our Team ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
            <Users className="mr-1.5 size-4" />
            THE PEOPLE BEHIND SRB
          </Badge>
          <h2 className="text-3xl font-black md:text-4xl">Meet Our Team</h2>
          <p className="mt-2 text-muted-foreground">
            Passionate people building India&apos;s best mobile shop experience
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TeamCard
            name="Supun Rathnayaka"
            role="Founder & CEO"
            image={aboutImg.founder}
            bio="Visionary entrepreneur with 8+ years in mobile retail. Passionate about making tech accessible to all."
            index={0}
          />
          <TeamCard
            name="Priya Sharma"
            role="Co-Founder & COO"
            image={aboutImg.cofounder}
            bio="Operations wizard who ensures every order is delivered with love. Former Amazon logistics lead."
            index={1}
          />
          <TeamCard
            name="Arjun Mehta"
            role="CTO"
            image={aboutImg.cto}
            bio="Tech architect behind our seamless platform. 10+ years building scalable e-commerce solutions."
            index={2}
          />
          <TeamCard
            name="Sneha Patel"
            role="Head of Design"
            image={aboutImg.headDesign}
            bio="Creative mind crafting beautiful shopping experiences. Previously at Flipkart and Swiggy."
            index={3}
          />
        </div>
      </section>

      {/* ═══ Brands We Carry ═══ */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-20 dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-black md:text-4xl">
              Brands We Partner With
            </h2>
            <p className="mt-2 text-muted-foreground">
              Official authorized retailer for {totalBrands} world-class brands
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(mockProducts.map((p) => p.brand))).map(
              (brand, i) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <Card className="border-0 bg-white shadow-md transition-all hover:shadow-xl dark:bg-zinc-800">
                    <CardContent className="flex items-center gap-3 px-5 py-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700">
                        <Smartphone className="size-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-bold">{brand}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══ Customer Testimonials ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-3 border-0 bg-primary/10 px-4 py-1.5 text-primary">
            <MessageCircle className="mr-1.5 size-4" />
            TESTIMONIALS
          </Badge>
          <h2 className="text-3xl font-black md:text-4xl">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Rahul K.",
              city: "Mumbai",
              rating: 5,
              text: "Bought my iPhone 15 Pro Max from SRB. Best price I found anywhere! Delivery was within 2 days and the packaging was perfect. Highly recommended!",
              product: mockProducts[0],
            },
            {
              name: "Ananya S.",
              city: "Bangalore",
              rating: 5,
              text: "The refurbished Galaxy S23 Ultra I got is literally like new. Saved ₹60,000 compared to buying fresh. SRB's quality checks are top-notch.",
              product: mockProducts[45],
            },
            {
              name: "Vikram P.",
              city: "Delhi",
              rating: 5,
              text: "Customer support is amazing — they helped me choose between Pixel 9 Pro and iPhone 15. Went with Pixel and couldn't be happier. Thank you SRB team!",
              product: mockProducts[2],
            },
            {
              name: "Neha R.",
              city: "Pune",
              rating: 5,
              text: "Used the trade-in program to upgrade from my old phone to OnePlus 12. Got great value for my old device and the new one arrived the next day!",
              product: mockProducts[3],
            },
            {
              name: "Karthik M.",
              city: "Chennai",
              rating: 5,
              text: "Ordered AirPods Pro and a charger — got a bundle discount plus free shipping. The deals page is addictive, keep checking for new offers!",
              product: mockProducts[6],
            },
            {
              name: "Deepa L.",
              city: "Hyderabad",
              rating: 5,
              text: "First time buying from SRB. The website is so easy to use and the prices are genuinely lower than other stores. Already recommended to 5 friends!",
              product: mockProducts[4],
            },
          ].map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative h-full border-0 bg-white shadow-md transition-all hover:shadow-xl dark:bg-zinc-900">
                <CardContent className="flex h-full flex-col space-y-4 p-6">
                  <Quote className="size-8 text-primary/20" />
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className="size-12 overflow-hidden rounded-full">
                      <img
                        src={review.product.image}
                        alt={review.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{review.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {review.city}
                      </p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, s) => (
                        <Star
                          key={s}
                          className="size-3.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Our Stores ═══ */}
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
              VISIT US
            </Badge>
            <h2 className="text-3xl font-black md:text-4xl">
              Our Experience Stores
            </h2>
            <p className="mt-2 text-muted-foreground">
              Come touch, feel, and experience devices before you buy
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                city: "Mumbai — Flagship Store",
                address: "SRB Mobile Shop, Linking Road, Bandra West, Mumbai 400050",
                timing: "10 AM - 9 PM, Mon-Sun",
                image: aboutImg.cityStore1,
                badge: "Flagship",
              },
              {
                city: "Pune — Experience Center",
                address: "SRB Mobile, FC Road, Shivajinagar, Pune 411005",
                timing: "10 AM - 8 PM, Mon-Sat",
                image: aboutImg.cityStore2,
                badge: "Popular",
              },
              {
                city: "Bangalore — Coming Soon",
                address: "MG Road, Bangalore 560001",
                timing: "Opening March 2026",
                image: aboutImg.cityStore3,
                badge: "New",
              },
            ].map((store, i) => (
              <motion.div
                key={store.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-800">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.city}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 border-0 bg-primary text-white shadow-lg">
                      {store.badge}
                    </Badge>
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <h3 className="text-lg font-bold">{store.city}</h3>
                    <p className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      {store.address}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4 shrink-0" />
                      {store.timing}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="mr-2 size-3.5" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Contact / CTA ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          {mockProducts.slice(5, 11).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.06 }}
              viewport={{ once: true }}
              className="absolute"
              style={{
                top: `${5 + (i % 3) * 35}%`,
                left: `${5 + i * 15}%`,
                width: "80px",
                height: "80px",
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
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4">
              <Phone className="size-8 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              Have Questions? We&apos;re Here to Help!
            </h2>
            <p className="mb-8 text-lg text-white/60">
              Our team of mobile experts is available 24/7 to help you find the
              perfect device.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+91 98765 43210",
                  sub: "Mon-Sun, 24/7",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+91 98765 43210",
                  sub: "Quick replies",
                },
                {
                  icon: Globe,
                  label: "Email",
                  value: "hello@srbmobile.in",
                  sub: "Response in 2 hrs",
                },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <contact.icon className="mx-auto mb-2 size-6 text-primary" />
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {contact.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {contact.value}
                  </p>
                  <p className="text-xs text-white/40">{contact.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-violet-600 font-bold"
                asChild
              >
                <Link href="/shop">
                  <ShoppingBag className="mr-2 size-5" />
                  Start Shopping
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white font-bold text-zinc-900 hover:bg-white/90"
                asChild
              >
                <Link href="/deals">
                  <Zap className="mr-2 size-5" />
                  View Deals
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
