"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Check,
  Minus,
  Plus,
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
import { useToast } from "@/hooks/use-toast"
import { PageLoader } from "@/components/LoadingStates"
import ProductCard from "@/components/ProductCard"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const productId = params.id as string

  const [selectedColor, setSelectedColor] = React.useState<string>()
  const [selectedStorage, setSelectedStorage] = React.useState<string>()
  const [quantity, setQuantity] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState<
    "description" | "specs" | "reviews"
  >("description")

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const found = mockProducts.find((p) => p.id === productId)
      if (!found) throw new Error("Product not found")
      return found
    },
  })

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.brand],
    queryFn: async () => {
      return mockProducts
        .filter((p) => p.brand === product?.brand && p.id !== productId)
        .slice(0, 4)
    },
    enabled: !!product,
  })

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.name)
      setSelectedStorage(product.storageOptions?.[0]?.size)
    }
  }, [product])

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} (${quantity} item${quantity > 1 ? "s" : ""})`,
      variant: "success",
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  if (isLoading) return <PageLoader />
  if (!product) return <div>Product not found</div>

  const selectedStoragePrice =
    product.storageOptions?.find((opt) => opt.size === selectedStorage)
      ?.price || product.price

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ChevronLeft className="mr-2 size-4" />
        Back to Shop
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/15 text-6xl font-semibold text-primary">
              {product.name.split(" ")[0]}
            </div>
            {product.isNew && (
              <Badge className="absolute left-4 top-4 bg-green-500 text-white">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="absolute left-4 top-4 bg-red-500 text-white">
                Sale
              </Badge>
            )}
          </div>

          {/* Thumbnail Carousel */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-muted transition-all hover:border-primary"
                >
                  <div className="flex h-full items-center justify-center text-sm font-medium text-primary">
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand & Title */}
          <div className="space-y-2">
            <Badge className={cn("w-fit", getBrandColor(product.brand))}>
              {product.brand}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-5",
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount} reviews
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(selectedStoragePrice)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-orange-500 text-white">
                    {product.discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              EMI starting from {formatPrice(selectedStoragePrice / 12)}/month
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Color: {selectedColor}
              </Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all",
                      selectedColor === color.name
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/50"
                    )}
                  >
                    <div
                      className="size-6 rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage Selector */}
          {product.storageOptions && product.storageOptions.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Storage: {selectedStorage}
              </Label>
              <div className="flex flex-wrap gap-2">
                {product.storageOptions.map((option) => (
                  <button
                    key={option.size}
                    onClick={() => setSelectedStorage(option.size)}
                    className={cn(
                      "rounded-lg border-2 px-4 py-2 transition-all",
                      selectedStorage === option.size
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/50"
                    )}
                  >
                    <div className="text-sm font-medium">{option.size}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatPrice(option.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <Check className="size-5 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  In Stock
                </span>
                {product.stockCount && product.stockCount < 10 && (
                  <span className="text-sm text-orange-600 dark:text-orange-400">
                    (Only {product.stockCount} left!)
                  </span>
                )}
              </>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quantity</Label>
            <div className="flex w-32 items-center gap-2 rounded-lg border border-border/60">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(product.stockCount || 99, prev + 1)
                  )
                }
                disabled={quantity >= (product.stockCount || 99)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 rounded-full"
              size="lg"
            >
              <ShoppingCart className="mr-2 size-5" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              variant="default"
              className="flex-1 rounded-full"
              size="lg"
            >
              <Zap className="mr-2 size-5" />
              Buy Now
            </Button>
            <Button variant="outline" size="icon" className="size-12 rounded-full">
              <Heart className="size-5" />
            </Button>
            <Button variant="outline" size="icon" className="size-12 rounded-full">
              <Share2 className="size-5" />
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Truck className="size-5 text-primary" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              <span className="text-sm">2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="size-5 text-primary" />
              <span className="text-sm">14-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-5 text-primary" />
              <span className="text-sm">Authentic Product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="mb-6 flex gap-6 border-b border-border">
          {(
            ["description", "specs", "reviews"] as Array<
              "description" | "specs" | "reviews"
            >
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between rounded-lg border border-border/60 bg-card/50 p-3"
                >
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-muted-foreground">
                    {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                  </span>
                </div>
              ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center text-muted-foreground">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={() =>
                  toast({
                    title: "Added to cart",
                    variant: "success",
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Label({ className, ...props }: React.ComponentPropsWithoutRef<"label">) {
  return <label className={cn("text-sm font-medium", className)} {...props} />
}
