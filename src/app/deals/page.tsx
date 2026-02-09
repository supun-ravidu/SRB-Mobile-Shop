"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BadgePercent,
  Bell,
  Bolt,
  Clock,
  Crown,
  Eye,
  Flame,
  Gift,
  Heart,
  Package,
  Percent,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react"

import { Product } from "@/types"
import { mockProducts, formatPrice, getBrandColor } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

// ─── Data helpers ────────────────────────────────────────────
const saleProducts = mockProducts.filter((p) => p.isSale)
const refurbishedDeals = mockProducts.filter((p) => p.category === "Refurbished")
const accessoryDeals = mockProducts.filter(
  (p) => p.category === "Accessories" && (p.isSale || p.discountPercentage)
)
const flagshipDeals = mockProducts.filter(
  (p) => p.category === "Flagship" && (p.isSale || p.discountPercentage)
)
const budgetDeals = mockProducts.filter(
  (p) => p.category === "Budget" && (p.isSale || p.discountPercentage)
)
const bigSavers = [...mockProducts]
  .filter((p) => p.discountPercentage)
  .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
  .slice(0, 6)

// Bundle combos (phone + accessory)
const bundles = [
  {
    id: "b1",
    title: "iPhone 15 Pro Max Ultimate Bundle",
    phone: mockProducts[0],
    accessories: [mockProducts[6], mockProducts[37], mockProducts[46]],
    bundleDiscount: 15,
    tag: "Most Popular",
  },
  {
    id: "b2",
    title: "Samsung Galaxy S24 Ultra Power Pack",
    phone: mockProducts[1],
    accessories: [mockProducts[7], mockProducts[36], mockProducts[44]],
    bundleDiscount: 18,
    tag: "Best Value",
  },
  {
    id: "b3",
    title: "Google Pixel 9 Pro Essential Kit",
    phone: mockProducts[2],
    accessories: [mockProducts[6], mockProducts[38], mockProducts[49]],
    bundleDiscount: 12,
    tag: "Editor's Choice",
  },
]

// Countdown hook
function useCountdown(hours: number) {
  const [time, setTime] = React.useState({
    hours: Math.floor(hours),
    minutes: Math.floor((hours % 1) * 60),
    seconds: 0,
  })

  React.useEffect(() => {
    const total = hours * 3600
    let remaining = total
    const interval = setInterval(() => {
      remaining -= 1
      if (remaining <= 0) remaining = total
      setTime({
        hours: Math.floor(remaining / 3600),
        minutes: Math.floor((remaining % 3600) / 60),
        seconds: remaining % 60,
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [hours])

  return time
}

// ─── Countdown Block ─────────────────────────────────────────
function CountdownBlock({
  hours,
  label,
  variant = "default",
}: {
  hours: number
  label?: string
  variant?: "default" | "compact" | "hero"
}) {
  const time = useCountdown(hours)
  const pad = (n: number) => String(n).padStart(2, "0")

  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-red-500">
        <Clock className="size-3.5" />
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </span>
    )
  }

  if (variant === "hero") {
    return (
      <div className="flex items-center gap-3">
        {label && (
          <span className="text-sm font-medium text-white/70">{label}</span>
        )}
        <div className="flex items-center gap-2">
          {[
            { val: pad(time.hours), lbl: "HRS" },
            { val: pad(time.minutes), lbl: "MIN" },
            { val: pad(time.seconds), lbl: "SEC" },
          ].map((t, i) => (
            <React.Fragment key={t.lbl}>
              {i > 0 && (
                <span className="text-2xl font-bold text-white/50">:</span>
              )}
              <div className="flex flex-col items-center">
                <span className="rounded-lg bg-white/20 px-3 py-1.5 font-mono text-2xl font-bold text-white backdrop-blur-sm">
                  {t.val}
                </span>
                <span className="mt-1 text-[10px] font-medium text-white/60">
                  {t.lbl}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
      {[
        { val: pad(time.hours), lbl: "h" },
        { val: pad(time.minutes), lbl: "m" },
        { val: pad(time.seconds), lbl: "s" },
      ].map((t, i) => (
        <React.Fragment key={t.lbl}>
          {i > 0 && (
            <span className="text-lg font-bold text-muted-foreground">:</span>
          )}
          <span className="rounded-md bg-zinc-900 px-2 py-1 font-mono text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
            {t.val}
            <span className="text-[10px] text-white/60 dark:text-zinc-500">
              {t.lbl}
            </span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Deal Card ───────────────────────────────────────────────
function DealCard({
  product,
  variant = "default",
  index = 0,
}: {
  product: Product
  variant?: "default" | "flash" | "big" | "compact"
  index?: number
}) {
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="group relative overflow-hidden border-0 bg-white shadow-md transition-all hover:shadow-xl dark:bg-zinc-900">
          <div className="flex items-center gap-4 p-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.discountPercentage && (
                <div className="absolute left-1 top-1 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                {product.brand}
              </p>
              <h4 className="text-sm font-semibold leading-tight line-clamp-1">
                {product.name}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <Button size="sm" className="shrink-0 rounded-full">
              <ShoppingCart className="size-3.5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  if (variant === "flash") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, type: "spring" }}
        className="group"
      >
        <Card className="relative overflow-hidden border-2 border-red-500/20 bg-white shadow-lg transition-all hover:border-red-500/50 hover:shadow-2xl dark:bg-zinc-900">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-orange-950/20 dark:to-yellow-950/10">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              <Badge className="border-0 bg-red-500 text-white shadow-lg">
                <Zap className="mr-1 size-3" />
                FLASH DEAL
              </Badge>
              {product.discountPercentage && (
                <Badge
                  variant="secondary"
                  className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                >
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
            <div className="absolute bottom-3 right-3">
              <CountdownBlock hours={2 + index * 0.5} variant="compact" />
            </div>
            <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-800">
              <Heart className="size-4" />
            </button>
          </div>
          <CardContent className="space-y-3 p-4">
            <div>
              <Badge
                variant="outline"
                className={cn("mb-1.5 text-[10px]", getBrandColor(product.brand))}
              >
                {product.brand}
              </Badge>
              <h3 className="font-semibold leading-tight line-clamp-1">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount.toLocaleString()})
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                {savings > 0 && (
                  <p className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <TrendingDown className="size-3" />
                    Save {formatPrice(savings)}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                className="rounded-full bg-red-500 hover:bg-red-600"
              >
                <ShoppingCart className="mr-1 size-3.5" />
                Grab Deal
              </Button>
            </div>
            {/* Stock bar */}
            {product.stockCount && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold text-red-500">
                    {product.stockCount < 20 ? "Almost gone!" : `${product.stockCount} left`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-red-100 dark:bg-red-950/30">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.min(100, (1 - product.stockCount / 100) * 100)}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (variant === "big") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group"
      >
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl dark:bg-zinc-900">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-violet-950/20 dark:via-pink-950/10 dark:to-orange-950/10">
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {product.discountPercentage && (
                <div className="absolute left-4 top-4">
                  <motion.div
                    initial={{ rotate: -12 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ once: true }}
                    className="flex size-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl"
                  >
                    <span className="text-2xl font-black">
                      {product.discountPercentage}%
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      OFF
                    </span>
                  </motion.div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product.isNew && (
                  <Badge className="border-0 bg-blue-500 text-white">NEW</Badge>
                )}
                {product.isFeatured && (
                  <Badge className="border-0 bg-purple-500 text-white">
                    <Crown className="mr-1 size-3" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
              <div>
                <Badge
                  variant="outline"
                  className={cn("mb-2", getBrandColor(product.brand))}
                >
                  {product.brand}
                </Badge>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-4",
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="flex items-center gap-1 text-sm font-bold text-green-600">
                    <TrendingDown className="size-4" />
                    You save {formatPrice(savings)}!
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <CountdownBlock hours={6 + index} label="Deal ends in:" />
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-violet-600"
                >
                  <ShoppingCart className="mr-2 size-4" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="size-3.5" /> Free Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> 1 Year Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Package className="size-3.5" /> Easy Returns
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-white shadow-md transition-all hover:shadow-xl dark:bg-zinc-900">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          {product.discountPercentage && (
            <Badge className="absolute left-3 top-3 border-0 bg-red-500 text-white shadow-lg">
              -{product.discountPercentage}%
            </Badge>
          )}
          <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-800">
            <Heart className="size-4" />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-sm font-bold text-white">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-white/70 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
        </div>
        <CardContent className="space-y-2 p-4">
          <div>
            <Badge
              variant="outline"
              className={cn("mb-1 text-[10px]", getBrandColor(product.brand))}
            >
              {product.brand}
            </Badge>
            <h4 className="font-semibold leading-tight line-clamp-1">
              {product.name}
            </h4>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            <Button size="sm" variant="outline" className="rounded-full text-xs">
              <ShoppingCart className="mr-1 size-3" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Main Page ───────────────────────────────────────────────
export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const categories = ["All", "Flagship", "Budget", "Accessories", "Refurbished"]

  const filteredSaleProducts =
    selectedCategory === "All"
      ? saleProducts
      : saleProducts.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ═══ Hero Banner ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        {/* Floating product images */}
        <div className="absolute inset-0 overflow-hidden">
          {bigSavers.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.15, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="absolute hidden lg:block"
              style={{
                top: `${15 + i * 20}%`,
                right: `${5 + i * 8}%`,
                width: `${120 - i * 10}px`,
                height: `${120 - i * 10}px`,
              }}
            >
              <img
                src={p.image}
                alt=""
                className="size-full rounded-2xl object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <Badge className="border-0 bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                <Flame className="mr-1.5 size-4" />
                MEGA SALE EVENT
              </Badge>
              <Badge className="animate-pulse border-0 bg-yellow-400 px-3 py-1.5 text-sm font-bold text-zinc-900">
                LIVE NOW
              </Badge>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Up to{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                53% OFF
              </span>
              <br />
              on Top Brands
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Incredible deals on smartphones, accessories & more. Limited time
              offers that won&apos;t last!
            </p>
            <CountdownBlock hours={23.5} label="Sale ends in:" variant="hero" />
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-white font-bold text-red-600 hover:bg-white/90"
              >
                <ShoppingCart className="mr-2 size-5" />
                Shop All Deals
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 font-bold text-white hover:bg-white/10"
              >
                <Bell className="mr-2 size-5" />
                Set Alert
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="fill-zinc-50 dark:fill-zinc-950">
            <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ Quick Stats ═══ */}
      <section className="mx-auto -mt-6 max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            {
              icon: Tag,
              label: "Active Deals",
              value: `${saleProducts.length}+`,
              color: "text-red-500 bg-red-50 dark:bg-red-950/30",
            },
            {
              icon: TrendingDown,
              label: "Max Discount",
              value: "53% OFF",
              color:
                "text-green-500 bg-green-50 dark:bg-green-950/30",
            },
            {
              icon: Truck,
              label: "Free Shipping",
              value: "₹999+",
              color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
            },
            {
              icon: ShieldCheck,
              label: "Warranty",
              value: "1 Year",
              color:
                "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="border-0 bg-white shadow-lg dark:bg-zinc-900"
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className={cn("rounded-xl p-3", stat.color)}>
                  <stat.icon className="size-5" />
                </div>
                <div>
                  <p className="text-lg font-black">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* ═══ ⚡ Flash Deals (Time-limited) ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-500 p-2">
                <Zap className="size-5 text-white" />
              </div>
              <h2 className="text-2xl font-black md:text-3xl">Flash Deals</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Lightning-fast offers. Grab them before they&apos;re gone!
            </p>
          </div>
          <CountdownBlock hours={3.75} label="Ends in:" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bigSavers.map((product, i) => (
            <DealCard key={product.id} product={product} variant="flash" index={i} />
          ))}
        </div>
      </section>

      {/* ═══ 🔥 Deal of the Day ═══ */}
      <section className="bg-gradient-to-r from-violet-50 via-pink-50 to-orange-50 py-16 dark:from-violet-950/10 dark:via-pink-950/10 dark:to-orange-950/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <Badge className="mb-3 border-0 bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-1.5 text-white">
              <Crown className="mr-1.5 size-4" />
              LIMITED EDITION OFFER
            </Badge>
            <h2 className="text-3xl font-black md:text-4xl">
              🔥 Deal of the Day
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked daily deal with massive savings
            </p>
          </motion.div>

          {/* The biggest discount product as Deal of the Day */}
          <DealCard product={bigSavers[0]} variant="big" />
        </div>
      </section>

      {/* ═══ 📦 Bundle Offers ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 p-2">
              <Gift className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-black md:text-3xl">
              Bundle & Save More
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete kits at exclusive prices. Buy together, save together!
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {bundles.map((bundle, i) => {
            const totalOriginal =
              (bundle.phone.originalPrice ?? bundle.phone.price) +
              bundle.accessories.reduce(
                (s, a) => s + (a.originalPrice ?? a.price),
                0
              )
            const totalBundle = Math.round(
              totalOriginal * (1 - bundle.bundleDiscount / 100)
            )
            const bundleSavings = totalOriginal - totalBundle

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="group relative overflow-hidden border-0 bg-white shadow-xl transition-all hover:shadow-2xl dark:bg-zinc-900">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600" />
                  <CardContent className="space-y-5 p-6">
                    <div className="flex items-center justify-between">
                      <Badge className="border-0 bg-gradient-to-r from-blue-500 to-violet-600 text-white">
                        {bundle.tag}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-600"
                      >
                        Save {bundle.bundleDiscount}%
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold">{bundle.title}</h3>

                    {/* Phone image hero */}
                    <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/20 dark:to-blue-900/20">
                      <img
                        src={bundle.phone.image}
                        alt={bundle.phone.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3">
                        <Badge
                          className={cn("border-0", getBrandColor(bundle.phone.brand))}
                        >
                          {bundle.phone.name}
                        </Badge>
                      </div>
                    </div>

                    {/* Accessories */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Included Accessories
                      </p>
                      <div className="flex gap-2">
                        {bundle.accessories.map((acc) => (
                          <div
                            key={acc.id}
                            className="group/acc relative size-16 overflow-hidden rounded-xl border bg-zinc-100 transition-all hover:border-primary dark:bg-zinc-800"
                          >
                            <img
                              src={acc.image}
                              alt={acc.name}
                              className="size-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover/acc:opacity-100">
                              <p className="px-1 text-center text-[9px] font-medium leading-tight text-white">
                                {acc.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-1 border-t pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total value
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(totalOriginal)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold">Bundle price</span>
                        <span className="text-2xl font-black text-primary">
                          {formatPrice(totalBundle)}
                        </span>
                      </div>
                      <p className="text-right text-sm font-bold text-green-600">
                        You save {formatPrice(bundleSavings)}!
                      </p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 font-bold">
                      <ShoppingCart className="mr-2 size-4" />
                      Get This Bundle
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ═══ Category Filter + All Sale Products ═══ */}
      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-black md:text-4xl">
              All Deals by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Filter and find the perfect deal for you
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full transition-all",
                  selectedCategory === cat &&
                    "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                )}
              >
                {cat === "All" && <Sparkles className="mr-1.5 size-3.5" />}
                {cat === "Flagship" && <Crown className="mr-1.5 size-3.5" />}
                {cat === "Budget" && <Tag className="mr-1.5 size-3.5" />}
                {cat === "Accessories" && <Package className="mr-1.5 size-3.5" />}
                {cat === "Refurbished" && (
                  <ShieldCheck className="mr-1.5 size-3.5" />
                )}
                {cat}
                <Badge
                  variant="secondary"
                  className="ml-1.5 h-5 w-5 justify-center rounded-full p-0 text-[10px]"
                >
                  {cat === "All"
                    ? saleProducts.length
                    : saleProducts.filter((p) => p.category === cat).length}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredSaleProducts.map((product, i) => (
                <DealCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredSaleProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No deals in this category right now. Check other categories!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 🏷️ Refurbished Deals Spotlight ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black md:text-3xl">
                Certified Refurbished
              </h2>
              <p className="text-sm text-muted-foreground">
                Like-new devices with up to 53% off & full warranty
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {refurbishedDeals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-2 border-emerald-100 bg-white transition-all hover:border-emerald-300 hover:shadow-xl dark:border-emerald-900/30 dark:bg-zinc-900 dark:hover:border-emerald-700">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 sm:w-48 dark:from-emerald-950/20 dark:to-teal-950/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.discountPercentage && (
                      <div className="absolute left-2 top-2 flex size-14 flex-col items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                        <span className="text-lg font-black">
                          {product.discountPercentage}%
                        </span>
                        <span className="text-[8px] font-bold">OFF</span>
                      </div>
                    )}
                    <Badge className="absolute bottom-2 left-2 border-0 bg-emerald-500 text-white">
                      <ShieldCheck className="mr-1 size-3" />
                      Certified
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col justify-center space-y-3 p-5">
                    <div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mb-1 text-[10px]",
                          getBrandColor(product.brand)
                        )}
                      >
                        {product.brand}
                      </Badge>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-black text-primary">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                        {product.originalPrice && (
                          <p className="text-xs font-bold text-emerald-600">
                            Save{" "}
                            {formatPrice(product.originalPrice - product.price)}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <ShoppingCart className="mr-1 size-3.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Trending Accessories ═══ */}
      <section className="bg-gradient-to-b from-zinc-100 to-white py-16 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 p-2">
                <Sparkles className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black md:text-3xl">
                  Trending Accessories
                </h2>
                <p className="text-sm text-muted-foreground">
                  Complete your setup with these popular picks
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
            >
              View All <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {mockProducts
                .filter((p) => p.category === "Accessories")
                .map((product, i) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <DealCard product={product} index={i} />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden lg:flex" />
            <CarouselNext className="-right-4 hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* ═══ Coupon / Promo Banner ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <CardContent className="relative flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <BadgePercent className="size-10 text-yellow-300" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-black md:text-3xl">
                  Extra 20% OFF with Code
                </h3>
                <p className="text-white/80">
                  Use coupon code on checkout for additional savings on all
                  products. Valid for new users!
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-8 py-3 backdrop-blur-sm">
                  <p className="font-mono text-2xl font-black tracking-widest">
                    FIRST20
                  </p>
                </div>
                <p className="text-xs text-white/60">
                  *Min. order ₹5,000. Max discount ₹2,000
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ═══ Quick Deals Ticker ═══ */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-xl font-black">⚡ Quick Picks Under ₹5,000</h2>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts
            .filter((p) => p.price < 5000)
            .map((product, i) => (
              <DealCard
                key={product.id}
                product={product}
                variant="compact"
                index={i}
              />
            ))}
        </div>
      </section>

      {/* ═══ Budget Champions Carousel ═══ */}
      <section className="bg-gradient-to-b from-white to-zinc-100 py-16 dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center gap-2"
          >
            <div className="rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-2">
              <TrendingUp className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black md:text-3xl">
                Budget Champions
              </h2>
              <p className="text-sm text-muted-foreground">
                Best value phones under ₹40,000
              </p>
            </div>
          </motion.div>

          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {mockProducts
                .filter(
                  (p) => p.category === "Budget" && p.price <= 40000
                )
                .map((product, i) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <DealCard product={product} index={i} />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden lg:flex" />
            <CarouselNext className="-right-4 hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* ═══ Flagship Deals Grid ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-2"
        >
          <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 p-2">
            <Crown className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black md:text-3xl">
              Flagship Deals
            </h2>
            <p className="text-sm text-muted-foreground">
              Premium phones at discounted prices
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipDeals.slice(0, 6).map((product, i) => (
            <DealCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ Newsletter / Deal Alert CTA ═══ */}
      <section className="bg-zinc-900 py-16 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white/10 p-4">
              <Bell className="size-8 text-yellow-400" />
            </div>
            <h2 className="mb-3 text-3xl font-black text-white">
              Never Miss a Deal
            </h2>
            <p className="mb-8 text-white/60">
              Get notified about exclusive deals, flash sales, and price drops
              on your favorite products.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none sm:w-80"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 font-bold hover:from-red-600 hover:to-orange-600"
              >
                <Bell className="mr-2 size-4" />
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/40">
              No spam, unsubscribe anytime. Join 10,000+ deal hunters!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Trust Badges Footer ═══ */}
      <section className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                icon: Truck,
                title: "Free Delivery",
                desc: "On orders above ₹999",
              },
              {
                icon: ShieldCheck,
                title: "Genuine Products",
                desc: "100% authentic guarantee",
              },
              {
                icon: Package,
                title: "Easy Returns",
                desc: "7-day hassle-free returns",
              },
              {
                icon: Bolt,
                title: "Secure Payment",
                desc: "100% secure checkout",
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
