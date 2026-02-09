"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, Heart, ShoppingCart, Star } from "lucide-react"

import { Product } from "@/types"
import { formatPrice, getBrandColor } from "@/lib/mockData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    onAddToCart?.(product)
    setIsAddingToCart(false)
  }

  const discountedPrice = product.discountPercentage
    ? product.price
    : product.price

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group relative h-full overflow-hidden border border-border/60 transition-all hover:shadow-lg">
        <CardContent className="flex h-full flex-col gap-3 p-4">
        {/* Badges Overlay */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="w-fit bg-green-500 text-white">New</Badge>
          )}
          {product.isSale && (
            <Badge className="w-fit bg-red-500 text-white">Sale</Badge>
          )}
          {product.discountPercentage && (
            <Badge className="w-fit bg-orange-500 text-white">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-110 dark:bg-zinc-800/90"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            )}
          />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-muted/60 to-muted">
          <motion.div
            className="flex h-full w-full items-center justify-center"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-4 transition-opacity duration-300"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </motion.div>

          {/* Quick View Button - Shows on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-0 hidden p-3 group-hover:block"
          >
            <Button
              onClick={() => onQuickView?.(product)}
              variant="secondary"
              size="sm"
              className="w-full rounded-full shadow-lg"
            >
              <Eye className="mr-2 size-4" />
              Quick View
            </Button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Brand Badge */}
          <Badge className={cn("w-fit text-xs", getBrandColor(product.brand))}>
            {product.brand}
          </Badge>

          {/* Product Name */}
          <h3 className="line-clamp-2 text-base font-semibold leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-1">
            {product.specs.ram && (
              <Badge variant="secondary" className="text-xs">
                {product.specs.ram} RAM
              </Badge>
            )}
            {product.specs.storage && (
              <Badge variant="secondary" className="text-xs">
                {product.specs.storage}
              </Badge>
            )}
            {product.specs.is5G && (
              <Badge variant="secondary" className="text-xs">
                5G
              </Badge>
            )}
            {product.specs.refreshRate && (
              <Badge variant="secondary" className="text-xs">
                {product.specs.refreshRate}
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(discountedPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock ? (
            <Badge variant="destructive" className="w-fit">
              Out of Stock
            </Badge>
          ) : product.stockCount && product.stockCount < 10 ? (
            <span className="text-xs text-orange-600 dark:text-orange-400">
              Only {product.stockCount} left!
            </span>
          ) : null}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="mt-2 w-full rounded-full"
            size="sm"
          >
            {isAddingToCart ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <ShoppingCart className="size-4" />
                </motion.div>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 size-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
