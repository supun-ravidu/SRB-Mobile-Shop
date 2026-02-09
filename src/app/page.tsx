"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import {
  ArrowRight,
  Headphones,
  ShieldCheck,
  Smartphone,
  Star,
  Truck,
  Zap,
  TrendingUp,
  Sparkles,
  RefreshCcw,
  Flame,
  Gift,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { mockProducts, formatPrice, getBrandColor } from "@/lib/mockData"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const categories = [
  { title: "Flagship Phones", count: `${mockProducts.filter(p => p.category === "Flagship").length}+`, icon: Smartphone, gradient: "from-violet-500 to-purple-600" },
  { title: "Budget Phones", count: `${mockProducts.filter(p => p.category === "Budget").length}+`, icon: Zap, gradient: "from-emerald-500 to-green-600" },
  { title: "Accessories", count: `${mockProducts.filter(p => p.category === "Accessories").length}+`, icon: Headphones, gradient: "from-orange-500 to-red-600" },
  { title: "Refurbished", count: `${mockProducts.filter(p => p.category === "Refurbished").length}+`, icon: RefreshCcw, gradient: "from-blue-500 to-cyan-600" },
]

const brands = [
  "Apple", "Samsung", "Google", "OnePlus", "Xiaomi",
  "Nothing", "Sony", "Vivo", "OPPO", "Realme",
  "Motorola", "Huawei", "Honor", "ASUS",
]

// Derived product collections
const flagshipPhones = mockProducts.filter(p => p.category === "Flagship")
const budgetPhones = mockProducts.filter(p => p.category === "Budget")
const accessories = mockProducts.filter(p => p.category === "Accessories")
const refurbished = mockProducts.filter(p => p.category === "Refurbished")
const newArrivals = mockProducts.filter(p => p.isNew)
const saleProducts = mockProducts.filter(p => p.isSale)
const featuredProducts = mockProducts.filter(p => p.isFeatured)
const trendingProducts = mockProducts.filter(p => p.rating >= 4.5).slice(0, 8)

function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : prev))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60

  return {
    hours,
    minutes,
    seconds,
    mounted,
  }
}

export default function Home() {
  const countdown = useCountdown(6 * 60 * 60 + 45 * 60 + 20)

  return (
    <div className="space-y-20 pb-20" id="home">
      <section
        className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white"
        data-aos="fade-up"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-white/10 text-white">
              SRB Exclusive Deals
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Premium Mobiles at Unbeatable Prices
            </h1>
            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              Latest smartphones with exclusive SRB deals, free shipping, and
              premium warranties.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {mockProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur transition-transform hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-full object-contain"
                    />
                    <div className="mt-2 text-xs text-white/70">{product.brand}</div>
                    <div className="text-sm font-semibold">{product.name.split(' ').slice(0, 2).join(' ')}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-10 right-6 hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur lg:block"
            >
              <div className="text-sm text-white/70">SRB Shield</div>
              <div className="text-xl font-semibold">2-Year Warranty</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        data-aos="fade-up"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden border border-border/60 bg-card/80 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="relative p-6">
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 transition-transform group-hover:scale-150`} />
                  <div className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                    <category.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} products</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        id="shop"
        data-aos="fade-up"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Best Selling Products</h2>
            <p className="text-sm text-muted-foreground">
              Top rated picks from SRB shoppers.
            </p>
          </div>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {mockProducts.filter(p => p.isFeatured).map((product, index) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border border-border/60 transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {product.isNew ? 'New' : product.isSale ? 'Sale' : 'Top'}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-amber-500">
                        <Star className="size-4 fill-amber-500" />
                        {product.rating}
                      </div>
                    </div>
                    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10">
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-4 transition-transform hover:scale-110"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button className="mt-auto rounded-full">
                      Add to Cart
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* ── Trending Now ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="size-5 text-orange-500" />
          <h2 className="text-2xl font-semibold">Trending Now</h2>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full cursor-pointer overflow-hidden border border-border/60 transition-all hover:shadow-xl">
                <CardContent className="p-4">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/40 to-muted/60">
                    <img src={product.image} alt={product.name} className="h-40 w-full object-contain p-3 transition-transform group-hover:scale-110" />
                    {product.isSale && (
                      <Badge className="absolute left-2 top-2 bg-red-500 text-white">{product.discountPercentage}% OFF</Badge>
                    )}
                    {product.isNew && (
                      <Badge className="absolute right-2 top-2 bg-green-500 text-white">New</Badge>
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── New Arrivals ────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-yellow-500" />
            <h2 className="text-2xl font-semibold">New Arrivals</h2>
          </div>
          <Button variant="ghost" className="rounded-full">View All <ArrowRight className="ml-1 size-4" /></Button>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {newArrivals.map((product, index) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group h-full overflow-hidden border-2 border-green-500/20 bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/20 transition-all hover:shadow-lg">
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-green-500 text-white">✨ Just Launched</Badge>
                      <div className="relative overflow-hidden rounded-xl">
                        <img src={product.image} alt={product.name} className="h-44 w-full object-contain p-2 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                      </div>
                      <Button className="mt-3 w-full rounded-full" size="sm">
                        Add to Cart <ArrowRight className="ml-1 size-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* ── Brands ──────────────────────────────────────────── */}
      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        id="brands"
        data-aos="fade-up"
      >
        <div className="rounded-3xl border border-border/60 bg-muted/40 px-6 py-10">
          <h2 className="text-center text-2xl font-semibold">Trusted Brands</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Official partners and authorized sellers</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:grid-cols-7">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer rounded-2xl border border-border/60 bg-background/80 px-3 py-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="text-sm font-semibold transition-colors group-hover:text-primary">
                  {brand}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {mockProducts.filter(p => p.brand === brand).length} products
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flash Deals ────────────────────────────────────── */}
      <section className="relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-[0.07] dark:opacity-[0.12]" />
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-red-500 animate-pulse" />
              <h2 className="text-2xl font-semibold">Flash Deals</h2>
              <Badge variant="destructive" className="animate-pulse">Limited Time</Badge>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ends in {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m</span>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {saleProducts.slice(0, 10).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group h-full overflow-hidden border border-red-500/20 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-red-500/40">
                  <CardContent className="p-3">
                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/20">
                      <img src={product.image} alt={product.name} className="h-32 w-full object-contain p-2 transition-transform group-hover:scale-110" />
                      <div className="absolute left-1 top-1">
                        <Badge className="bg-red-500 text-[10px] text-white px-1.5 py-0.5">-{product.discountPercentage}%</Badge>
                      </div>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                      <h3 className="text-xs font-semibold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">{formatPrice(product.price)}</span>
                      </div>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        id="deals"
        data-aos="fade-up"
      >
        <Card className="overflow-hidden border border-border/60">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">
                Deal of the Day
              </Badge>
              <h2 className="text-2xl font-semibold">Galaxy S24 Ultra</h2>
              <p className="text-sm text-muted-foreground">
                Save big on the most powerful Galaxy with SRB instant discount
                and bundled accessories.
              </p>
              <div className="flex items-center gap-3 text-lg font-semibold">
                <span className="text-primary">{formatPrice(mockProducts[1].price)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {mockProducts[1].originalPrice ? formatPrice(mockProducts[1].originalPrice) : ''}
                </span>
              </div>
              <div className="flex gap-4 text-center text-sm">
                {countdown.mounted ? (
                  [countdown.hours, countdown.minutes, countdown.seconds].map(
                    (value, index) => (
                      <div
                        key={index}
                        className="flex min-w-[70px] flex-col rounded-xl border border-border/60 bg-muted/40 px-3 py-2"
                      >
                        <span className="text-lg font-semibold">
                          {String(value).padStart(2, "0")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {index === 0
                            ? "Hours"
                            : index === 1
                              ? "Minutes"
                              : "Seconds"}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex gap-4">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="flex min-w-[70px] flex-col rounded-xl border border-border/60 bg-muted/40 px-3 py-2"
                      >
                        <span className="text-lg font-semibold">--</span>
                        <span className="text-xs text-muted-foreground">
                          {index === 0
                            ? "Hours"
                            : index === 1
                              ? "Minutes"
                              : "Seconds"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="rounded-full">Grab Deal</Button>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10">
              <motion.img
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                src={mockProducts[1].image}
                alt="Galaxy S24 Ultra"
                className="h-full w-full object-contain p-8 transition-transform hover:scale-110"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* ── Flagship Showcase ──────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Flagship Showcase</h2>
          <p className="text-sm text-muted-foreground">Experience the pinnacle of mobile innovation</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipPhones.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="group h-full overflow-hidden border border-border/60 transition-all hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                    <img src={product.image} alt={product.name} className="h-56 w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {product.isNew && <Badge className="bg-green-500 text-white text-[10px]">New</Badge>}
                      {product.isSale && <Badge className="bg-red-500 text-white text-[10px]">Sale</Badge>}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px]">{product.brand}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <Button size="sm" className="rounded-full text-xs">Buy Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Budget Champions ───────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Gift className="size-5 text-emerald-500" />
              <h2 className="text-2xl font-semibold">Budget Champions</h2>
            </div>
            <p className="text-sm text-muted-foreground">Amazing specs without breaking the bank</p>
          </div>
          <Button variant="ghost" className="rounded-full">See All <ArrowRight className="ml-1 size-4" /></Button>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {budgetPhones.map((product, index) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
                <Card className="group h-full overflow-hidden border border-emerald-500/20 transition-all hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/40 to-green-50/40 dark:from-emerald-950/20 dark:to-green-950/20">
                      <img src={product.image} alt={product.name} className="h-40 w-full object-contain p-3 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <div className="flex items-center gap-0.5">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* ── Accessories Grid ───────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Headphones className="size-5 text-orange-500" />
            <h2 className="text-2xl font-semibold">Must-Have Accessories</h2>
          </div>
          <p className="text-sm text-muted-foreground">Cases, chargers, earbuds, and more</p>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {accessories.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="group h-full cursor-pointer overflow-hidden border border-orange-500/20 transition-all hover:shadow-lg">
                <CardContent className="p-3">
                  <div className="overflow-hidden rounded-lg bg-gradient-to-br from-orange-50/30 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/20">
                    <img src={product.image} alt={product.name} className="h-28 w-full object-contain p-2 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                    <h3 className="text-xs font-semibold line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Refurbished Deals ──────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" data-aos="fade-up">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50/40 to-cyan-50/40 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="size-5 text-blue-500" />
                <h2 className="text-2xl font-semibold">Certified Refurbished</h2>
              </div>
              <p className="text-sm text-muted-foreground">Like new, fraction of the price. Full warranty included.</p>
            </div>
            <Badge className="bg-blue-500 text-white">Up to 53% OFF</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {refurbished.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="group h-full overflow-hidden border border-blue-500/20 bg-background/80 transition-all hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="overflow-hidden rounded-xl">
                      <img src={product.image} alt={product.name} className="h-40 w-full object-contain p-2 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-600 dark:text-blue-400">Certified</Badge>
                        <Badge variant="destructive" className="text-[10px]">-{product.discountPercentage}%</Badge>
                      </div>
                      <h3 className="text-sm font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        Save {product.originalPrice ? formatPrice(product.originalPrice - product.price) : ''}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SRB Features ───────────────────────────────── */}
      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        id="about"
        data-aos="fade-up"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Free Shipping",
              description: "Fast, insured delivery across the country.",
              icon: Truck,
            },
            {
              title: "2-Year Warranty",
              description: "Official manufacturer warranty on every device.",
              icon: ShieldCheck,
            },
            {
              title: "Easy Returns",
              description: "Hassle-free exchanges within 14 days.",
              icon: Smartphone,
            },
            {
              title: "24/7 Support",
              description: "Real experts ready to assist anytime.",
              icon: Headphones,
            },
          ].map((feature) => (
            <Card key={feature.title} className="border border-border/60">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        id="contact"
        data-aos="fade-up"
      >
        <Card className="border border-border/60">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="text-2xl font-semibold">Ready to upgrade?</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Talk to SRB specialists for personalized recommendations, trade-in
              offers, and enterprise discounts.
            </p>
            <Button size="lg" className="rounded-full">
              Contact SRB Team
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
