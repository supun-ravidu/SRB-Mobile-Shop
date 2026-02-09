"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Filter,
  Grid3x3,
  List,
  X,
  Smartphone,
  Zap,
  Headphones,
  RefreshCcw,
  Star,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  Package,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Product, FilterOptions, SortOption } from "@/types"
import { mockProducts, formatPrice, getBrandColor } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/ProductCard"
import { ProductCardSkeleton } from "@/components/LoadingStates"
import { useToast } from "@/hooks/use-toast"

// Derive brands from actual product data
const BRANDS = Array.from(new Set(mockProducts.map(p => p.brand))).sort()
const RAM_OPTIONS = ["4GB", "6GB", "8GB", "12GB", "16GB"]
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"]
const FEATURES = ["5G", "Wireless Charging", "IP Rating", "High Refresh Rate"]
const CATEGORIES = [
  { key: "All", label: "All Products", icon: LayoutGrid, count: mockProducts.length },
  { key: "Flagship", label: "Flagship", icon: Sparkles, count: mockProducts.filter(p => p.category === "Flagship").length },
  { key: "Budget", label: "Budget", icon: Zap, count: mockProducts.filter(p => p.category === "Budget").length },
  { key: "Accessories", label: "Accessories", icon: Headphones, count: mockProducts.filter(p => p.category === "Accessories").length },
  { key: "Refurbished", label: "Refurbished", icon: RefreshCcw, count: mockProducts.filter(p => p.category === "Refurbished").length },
]

function ShopContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = React.useState<SortOption>("newest")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 200000,
  ])
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedRAM, setSelectedRAM] = React.useState<string[]>([])
  const [selectedStorage, setSelectedStorage] = React.useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([])
  const [wishlist, setWishlist] = React.useState<string[]>([])

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      "products",
      selectedCategory,
      priceRange,
      selectedBrands,
      selectedRAM,
      selectedStorage,
      selectedFeatures,
      sortBy,
    ],
    queryFn: async () => {
      let filtered = mockProducts.filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesBrand =
          selectedBrands.length === 0 || selectedBrands.includes(product.brand)
        const matchesRAM =
          selectedRAM.length === 0 || selectedRAM.includes(product.specs.ram)
        const matchesStorage =
          selectedStorage.length === 0 ||
          selectedStorage.includes(product.specs.storage)
        const matchesFeatures =
          selectedFeatures.length === 0 ||
          selectedFeatures.every((feature) => {
            if (feature === "5G") return product.specs.is5G
            if (feature === "Wireless Charging")
              return product.specs.hasWirelessCharging
            if (feature === "IP Rating") return product.specs.ipRating
            if (feature === "High Refresh Rate")
              return product.specs.refreshRate?.includes("120Hz")
            return false
          })

        return (
          matchesCategory &&
          matchesPrice &&
          matchesBrand &&
          matchesRAM &&
          matchesStorage &&
          matchesFeatures
        )
      })

      // Sort
      if (sortBy === "price-low") {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy === "price-high") {
        filtered.sort((a, b) => b.price - a.price)
      } else if (sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating)
      } else if (sortBy === "newest") {
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      }

      return filtered
    },
  })

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(productId)
      if (isInWishlist) {
        toast({
          title: "Removed from wishlist",
          variant: "default",
        })
        return prev.filter((id) => id !== productId)
      } else {
        toast({
          title: "Added to wishlist",
          description: "Item saved for later",
          variant: "success",
        })
        return [...prev, productId]
      }
    })
  }

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      variant: "success",
    })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 200000])
    setSelectedBrands([])
    setSelectedRAM([])
    setSelectedStorage([])
    setSelectedFeatures([])
    setSelectedCategory("All")
  }

  const activeFiltersCount =
    selectedBrands.length +
    selectedRAM.length +
    selectedStorage.length +
    selectedFeatures.length

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <Slider
          min={0}
          max={200000}
          step={1000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="w-full"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Brands</Label>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  setSelectedBrands((prev) =>
                    checked
                      ? [...prev, brand]
                      : prev.filter((b) => b !== brand)
                  )
                }}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">RAM</Label>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((ram) => (
            <Button
              key={ram}
              variant={selectedRAM.includes(ram) ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedRAM((prev) =>
                  prev.includes(ram)
                    ? prev.filter((r) => r !== ram)
                    : [...prev, ram]
                )
              }
              className="rounded-full"
            >
              {ram}
            </Button>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Storage</Label>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((storage) => (
            <Button
              key={storage}
              variant={
                selectedStorage.includes(storage) ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                setSelectedStorage((prev) =>
                  prev.includes(storage)
                    ? prev.filter((s) => s !== storage)
                    : [...prev, storage]
                )
              }
              className="rounded-full"
            >
              {storage}
            </Button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Features</Label>
        <div className="space-y-2">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={(checked) => {
                  setSelectedFeatures((prev) =>
                    checked
                      ? [...prev, feature]
                      : prev.filter((f) => f !== feature)
                  )
                }}
              />
              <Label
                htmlFor={`feature-${feature}`}
                className="text-sm font-normal"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-12">
      {/* ── Hero Banner ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full bg-white/10 text-white backdrop-blur">
                <Package className="mr-1 size-3" />
                {mockProducts.length} Products Available
              </Badge>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Shop All Mobiles & Accessories
              </h1>
              <p className="max-w-xl text-sm text-white/60 sm:text-base">
                From premium flagships to budget champions — find your perfect device with exclusive SRB prices, free shipping, and 2-year warranty.
              </p>
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { label: "Brands", value: BRANDS.length + "+" },
                  { label: "Flagships", value: mockProducts.filter(p => p.category === "Flagship").length },
                  { label: "On Sale", value: mockProducts.filter(p => p.isSale).length },
                  { label: "New Arrivals", value: mockProducts.filter(p => p.isNew).length },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating product images */}
            <div className="hidden lg:flex items-center gap-3">
              {mockProducts.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                >
                  <img src={p.image} alt={p.name} className="h-28 w-20 object-contain" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Quick Filters ─────────────────────────── */}
      <div className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = selectedCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {cat.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isActive ? "bg-white/20" : "bg-background"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {/* ── Active Filter Tags ──────────────────────────── */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {selectedBrands.map((b) => (
              <Badge key={b} variant="secondary" className="gap-1 rounded-full text-xs">
                {b}
                <X className="size-3 cursor-pointer" onClick={() => setSelectedBrands(prev => prev.filter(x => x !== b))} />
              </Badge>
            ))}
            {selectedRAM.map((r) => (
              <Badge key={r} variant="secondary" className="gap-1 rounded-full text-xs">
                {r} RAM
                <X className="size-3 cursor-pointer" onClick={() => setSelectedRAM(prev => prev.filter(x => x !== r))} />
              </Badge>
            ))}
            {selectedStorage.map((s) => (
              <Badge key={s} variant="secondary" className="gap-1 rounded-full text-xs">
                {s}
                <X className="size-3 cursor-pointer" onClick={() => setSelectedStorage(prev => prev.filter(x => x !== s))} />
              </Badge>
            ))}
            {selectedFeatures.map((f) => (
              <Badge key={f} variant="secondary" className="gap-1 rounded-full text-xs">
                {f}
                <X className="size-3 cursor-pointer" onClick={() => setSelectedFeatures(prev => prev.filter(x => x !== f))} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs text-destructive hover:text-destructive">
              Clear All
            </Button>
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4 rounded-2xl border border-border/60 bg-card p-5">
              <FilterPanel />

              {/* ── Sidebar Featured Product ────────────── */}
              <div className="mt-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4">
                <Badge className="mb-2 bg-primary/10 text-primary text-[10px]">🔥 Hot Deal</Badge>
                <img src={mockProducts[1].image} alt={mockProducts[1].name} className="mx-auto h-28 object-contain" />
                <h4 className="mt-2 text-sm font-semibold">{mockProducts[1].name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-primary">{formatPrice(mockProducts[1].price)}</span>
                  {mockProducts[1].originalPrice && (
                    <span className="text-[10px] text-muted-foreground line-through">{formatPrice(mockProducts[1].originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden rounded-full">
                      <SlidersHorizontal className="mr-2 size-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Toggle */}
                <div className="hidden items-center gap-1 rounded-lg border border-border/60 p-1 sm:flex">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="size-8"
                  >
                    <Grid3x3 className="size-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="size-8"
                  >
                    <List className="size-4" />
                  </Button>
                </div>

                {/* Results count */}
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {products.length} of {mockProducts.length} products
                </span>
              </div>

              {/* Sort Dropdown */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger size="sm" className="w-[180px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-4"
                }
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-card p-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                  <Package className="size-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">No products found</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Try adjusting your filters or clearing them to see all {mockProducts.length} products
                </p>
                <Button onClick={clearAllFilters} className="rounded-full">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-4"
                }
              >
                <AnimatePresence mode="popLayout">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isInWishlist={wishlist.includes(product.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Results footer */}
            {products.length > 0 && (
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing all {products.length} results
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrap with Suspense to fix Next.js useSearchParams error
export default function ShopPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      }
    >
      <ShopContent />
    </React.Suspense>
  )
}
