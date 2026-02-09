"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronLeft,
  Gift,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Truck,
  X,
  Zap,
  CreditCard,
  Lock,
  Percent,
  Heart,
  ArrowLeft,
  Check,
  Clock,
  BadgePercent,
} from "lucide-react"

import { Product, CartItem } from "@/types"
import { mockProducts, formatPrice, getBrandColor } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Pre-populated cart items for showcase
const initialCartItems: CartItem[] = [
  { product: mockProducts[0], quantity: 1, selectedColor: "Natural Titanium", selectedStorage: "256GB" },
  { product: mockProducts[6], quantity: 2 },
  { product: mockProducts[1], quantity: 1, selectedColor: "Titanium Gray", selectedStorage: "256GB" },
  { product: mockProducts[37], quantity: 1 },
  { product: mockProducts[38], quantity: 1 },
]

const suggestedProducts = mockProducts.filter(p => p.isFeatured).slice(0, 8)
const recentlyViewed = mockProducts.slice(10, 18)

const COUPONS = [
  { code: "SRB500", discount: 500, minOrder: 10000, label: "₹500 off on orders above ₹10,000" },
  { code: "FIRST20", discount: 2000, minOrder: 20000, label: "₹2,000 off for first-time buyers" },
  { code: "MEGA10", discount: 0, percent: 10, maxDiscount: 5000, minOrder: 15000, label: "10% off up to ₹5,000" },
]

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

  return { hours, minutes, seconds, mounted }
}

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = React.useState<CartItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState<typeof COUPONS[0] | null>(null)
  const [savedForLater, setSavedForLater] = React.useState<Product[]>([])
  const countdown = useCountdown(2 * 60 * 60 + 15 * 60 + 30)

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(10, item.quantity + delta)) }
          : item
      )
    )
  }

  const removeItem = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId)
    setCartItems(prev => prev.filter(i => i.product.id !== productId))
    toast({ title: "Removed from cart", description: `${item?.product.name} removed` })
  }

  const moveToSaved = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId)
    if (item) {
      setSavedForLater(prev => [...prev, item.product])
      setCartItems(prev => prev.filter(i => i.product.id !== productId))
      toast({ title: "Saved for later", description: `${item.product.name} moved to saved items` })
    }
  }

  const moveToCart = (product: Product) => {
    setSavedForLater(prev => prev.filter(p => p.id !== product.id))
    setCartItems(prev => [...prev, { product, quantity: 1 }])
    toast({ title: "Moved to cart", description: `${product.name} added back to cart` })
  }

  const addToCart = (product: Product) => {
    const exists = cartItems.find(i => i.product.id === product.id)
    if (exists) {
      updateQuantity(product.id, 1)
    } else {
      setCartItems(prev => [...prev, { product, quantity: 1 }])
    }
    toast({ title: "Added to cart", description: `${product.name} added` })
  }

  const applyCoupon = () => {
    const found = COUPONS.find(c => c.code.toLowerCase() === couponCode.trim().toLowerCase())
    if (found && subtotal >= found.minOrder) {
      setAppliedCoupon(found)
      toast({ title: "Coupon applied!", description: found.label })
    } else if (found) {
      toast({ title: "Minimum order not met", description: `Requires min order of ${formatPrice(found.minOrder)}` })
    } else {
      toast({ title: "Invalid coupon", description: "Please check the coupon code" })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalOriginal = cartItems.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0)
  const productDiscount = totalOriginal - subtotal
  const couponDiscount = appliedCoupon
    ? appliedCoupon.percent
      ? Math.min(subtotal * appliedCoupon.percent / 100, appliedCoupon.maxDiscount || Infinity)
      : appliedCoupon.discount
    : 0
  const shipping = subtotal > 10000 ? 0 : 99
  const total = subtotal - couponDiscount + shipping
  const totalSavings = productDiscount + couponDiscount + (shipping === 0 ? 99 : 0)

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex size-28 items-center justify-center rounded-full bg-muted"
        >
          <ShoppingCart className="size-14 text-muted-foreground" />
        </motion.div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="max-w-md text-center text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet. Browse our collection of premium mobile devices and accessories.
        </p>
        <div className="flex gap-3">
          <Link href="/shop">
            <Button className="rounded-full" size="lg">
              <ShoppingBag className="mr-2 size-4" />
              Start Shopping
            </Button>
          </Link>
          <Link href="/deals">
            <Button variant="outline" className="rounded-full" size="lg">
              <Tag className="mr-2 size-4" />
              View Deals
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* ── Cart Banner ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <ShoppingCart className="size-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">Shopping Cart</h1>
                  <p className="text-sm text-white/60">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
                </div>
              </div>
            </div>
            {/* Mini floating product preview */}
            <div className="hidden lg:flex items-center gap-2">
              {cartItems.slice(0, 4).map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="size-12 rounded-xl border border-white/20 bg-white/10 p-1 backdrop-blur"
                >
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" />
                </motion.div>
              ))}
              {cartItems.length > 4 && (
                <div className="flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xs font-medium backdrop-blur">
                  +{cartItems.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Savings Banner ─────────────────────────────────── */}
      {totalSavings > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-b border-green-500/20">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-4 py-2.5 sm:px-6">
            <Sparkles className="size-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              You&apos;re saving {formatPrice(totalSavings)} on this order!
            </span>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* ── Cart Items ───────────────────────────────── */}
          <div className="space-y-4">
            {/* Free shipping progress */}
            <Card className="border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="size-5 text-blue-500" />
                  {subtotal >= 10000 ? (
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        <Check className="mr-1 inline size-4" /> Free shipping unlocked!
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-1.5">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Add {formatPrice(10000 - subtotal)} more for <strong>FREE shipping</strong>
                      </p>
                      <div className="h-2 w-full rounded-full bg-blue-200 dark:bg-blue-800">
                        <motion.div
                          className="h-full rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (subtotal / 10000) * 100)}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden border border-border/60 transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product Image */}
                        <div className="relative w-full sm:w-48 shrink-0">
                          <div className="relative h-48 sm:h-full overflow-hidden bg-gradient-to-br from-muted/60 to-muted">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                            />
                            {/* Discount badge */}
                            {item.product.discountPercentage && (
                              <Badge className="absolute left-2 top-2 bg-red-500 text-white text-[10px]">
                                {item.product.discountPercentage}% OFF
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <Badge className={cn("text-[10px]", getBrandColor(item.product.brand))}>
                                {item.product.brand}
                              </Badge>
                              <Link href={`/product/${item.product.id}`}>
                                <h3 className="text-base font-semibold hover:text-primary transition-colors line-clamp-1">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="size-3 fill-amber-400 text-amber-400" />
                                <span>{item.product.rating}</span>
                                <span>({item.product.reviewCount} reviews)</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.product.id)}
                              className="size-8 shrink-0 text-muted-foreground hover:text-red-500"
                            >
                              <X className="size-4" />
                            </Button>
                          </div>

                          {/* Selected options */}
                          <div className="flex flex-wrap gap-2">
                            {item.selectedColor && (
                              <Badge variant="outline" className="text-[10px]">
                                Color: {item.selectedColor}
                              </Badge>
                            )}
                            {item.selectedStorage && (
                              <Badge variant="outline" className="text-[10px]">
                                Storage: {item.selectedStorage}
                              </Badge>
                            )}
                            {item.product.inStock ? (
                              <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-600 dark:text-green-400">
                                <Check className="mr-1 size-2.5" /> In Stock
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-[10px]">Out of Stock</Badge>
                            )}
                          </div>

                          {/* Price & Quantity */}
                          <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-primary">
                                  {formatPrice(item.product.price * item.quantity)}
                                </span>
                                {item.product.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {formatPrice(item.product.originalPrice * item.quantity)}
                                  </span>
                                )}
                              </div>
                              {item.quantity > 1 && (
                                <span className="text-[10px] text-muted-foreground">
                                  {formatPrice(item.product.price)} × {item.quantity}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-0.5">
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-8 rounded-l-full"
                                onClick={() => updateQuantity(item.product.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="size-3" />
                              </Button>
                              <div className="flex size-8 items-center justify-center border-y border-border bg-muted/30 text-sm font-medium">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-8 rounded-r-full"
                                onClick={() => updateQuantity(item.product.id, 1)}
                                disabled={item.quantity >= 10}
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-1 border-t border-border/40">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-muted-foreground hover:text-primary"
                              onClick={() => moveToSaved(item.product.id)}
                            >
                              <Heart className="mr-1 size-3" /> Save for later
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-muted-foreground hover:text-red-500"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="mr-1 size-3" /> Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* ── Saved for Later ─────────────────────────── */}
            {savedForLater.length > 0 && (
              <div className="pt-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Heart className="size-5 text-red-500" />
                  Saved for Later ({savedForLater.length})
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {savedForLater.map((product) => (
                    <Card key={product.id} className="overflow-hidden border border-border/60">
                      <CardContent className="flex gap-3 p-3">
                        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img src={product.image} alt={product.name} className="h-full w-full object-contain p-2" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate">{product.name}</h4>
                          <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                          <Button size="sm" className="mt-auto rounded-full text-xs w-fit" onClick={() => moveToCart(product)}>
                            <ShoppingCart className="mr-1 size-3" /> Move to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary Sidebar ─────────────────────── */}
          <div className="space-y-4">
            <Card className="sticky top-20 overflow-hidden border border-border/60">
              <CardContent className="p-0">
                {/* Header */}
                <div className="border-b border-border/60 bg-muted/30 px-5 py-4">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </div>

                <div className="space-y-4 p-5">
                  {/* Coupon Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <BadgePercent className="size-4 text-primary" />
                      Apply Coupon
                    </label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-50 dark:bg-green-950/20 px-3 py-2">
                        <div>
                          <span className="text-sm font-semibold text-green-700 dark:text-green-300">{appliedCoupon.code}</span>
                          <p className="text-[10px] text-green-600 dark:text-green-400">{appliedCoupon.label}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-6" onClick={() => setAppliedCoupon(null)}>
                          <X className="size-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="rounded-full text-sm"
                        />
                        <Button onClick={applyCoupon} size="sm" variant="outline" className="rounded-full shrink-0">
                          Apply
                        </Button>
                      </div>
                    )}
                    {/* Available coupons */}
                    {!appliedCoupon && (
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[10px] text-muted-foreground">Available coupons:</p>
                        {COUPONS.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => { setCouponCode(c.code); }}
                            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-1.5 text-left transition-colors hover:bg-primary/10"
                          >
                            <Tag className="size-3 text-primary shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs font-semibold text-primary">{c.code}</span>
                              <p className="text-[10px] text-muted-foreground truncate">{c.label}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 border-t border-border/60 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>{formatPrice(totalOriginal)}</span>
                    </div>
                    {productDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400">Product Discount</span>
                        <span className="text-green-600 dark:text-green-400">-{formatPrice(productDiscount)}</span>
                      </div>
                    )}
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400">Coupon ({appliedCoupon?.code})</span>
                        <span className="text-green-600 dark:text-green-400">-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                      ) : (
                        <span>{formatPrice(shipping)}</span>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-border/60 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                        {totalSavings > 0 && (
                          <p className="text-xs text-green-600 dark:text-green-400">
                            You save {formatPrice(totalSavings)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full rounded-full text-base py-6" size="lg">
                    <Lock className="mr-2 size-4" />
                    Proceed to Checkout
                  </Button>

                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <CreditCard className="size-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">UPI • Cards • Net Banking • EMI</span>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60">
                    {[
                      { icon: ShieldCheck, label: "Secure Payment" },
                      { icon: Truck, label: "Free Shipping" },
                      { icon: Package, label: "Easy Returns" },
                    ].map((badge) => (
                      <div key={badge.label} className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 p-2">
                        <badge.icon className="size-4 text-primary" />
                        <span className="text-[9px] text-center text-muted-foreground">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Offer Banner ──────────────────────────── */}
            <Card className="overflow-hidden border border-orange-500/30 bg-gradient-to-br from-orange-50/60 to-amber-50/60 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/10">
                    <Clock className="size-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Limited Time Offer</p>
                    <p className="text-xs text-muted-foreground">
                      Checkout within{" "}
                      {countdown.mounted
                        ? `${String(countdown.hours).padStart(2, "0")}h ${String(countdown.minutes).padStart(2, "0")}m`
                        : "--h --m"}{" "}
                      for extra 5% off
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Frequently Bought Together ────────────────── */}
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="size-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Frequently Bought Together</h2>
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {mockProducts.filter(p => p.category === "Accessories").slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group h-full overflow-hidden border border-border/60 transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-3">
                    <div className="overflow-hidden rounded-lg bg-gradient-to-br from-muted/40 to-muted/60">
                      <img src={product.image} alt={product.name} className="h-32 w-full object-contain p-3 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                      <h4 className="text-xs font-semibold line-clamp-2">{product.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <Button size="sm" className="w-full rounded-full text-[10px] mt-1" onClick={() => addToCart(product)}>
                        <Plus className="mr-1 size-3" /> Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── You May Also Like ─────────────────────────── */}
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-purple-500" />
              <h2 className="text-xl font-semibold">You May Also Like</h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="rounded-full text-sm">
                View All <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {suggestedProducts.map((product) => (
                <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/5">
                  <Card className="group h-full overflow-hidden border border-border/60 transition-all hover:shadow-lg">
                    <CardContent className="p-3">
                      <div className="overflow-hidden rounded-lg bg-gradient-to-br from-muted/40 to-muted/60">
                        <img src={product.image} alt={product.name} className="h-28 w-full object-contain p-2 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="mt-2 space-y-0.5">
                        <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                        <h4 className="text-xs font-semibold line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="size-2.5 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                        </div>
                        <span className="block text-sm font-bold text-primary">{formatPrice(product.price)}</span>
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

        {/* ── Recently Viewed ───────────────────────────── */}
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="size-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Recently Viewed</h2>
          </div>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {recentlyViewed.map((product) => (
                <CarouselItem key={product.id} className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
                  <Link href={`/product/${product.id}`}>
                    <Card className="group h-full overflow-hidden border border-border/60 transition-all hover:shadow-md">
                      <CardContent className="p-2">
                        <div className="overflow-hidden rounded-md bg-muted/40">
                          <img src={product.image} alt={product.name} className="h-20 w-full object-contain p-1 transition-transform group-hover:scale-110" />
                        </div>
                        <p className="mt-1 text-[10px] font-medium line-clamp-1">{product.name}</p>
                        <p className="text-[10px] font-bold text-primary">{formatPrice(product.price)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </div>
  )
}
