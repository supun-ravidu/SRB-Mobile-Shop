import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ProductCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border border-border/60">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        {/* Image Skeleton */}
        <div className="aspect-square animate-pulse rounded-xl bg-muted" />

        {/* Content Skeletons */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Brand Badge */}
          <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />

          {/* Product Name */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>

          {/* Rating */}
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />

          {/* Specs */}
          <div className="flex gap-1">
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-12 animate-pulse rounded-full bg-muted" />
          </div>

          {/* Price */}
          <div className="mt-auto h-6 w-28 animate-pulse rounded bg-muted" />

          {/* Button */}
          <div className="mt-2 h-9 w-full animate-pulse rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ShimmerEffect({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    />
  )
}

export function LoadingSpinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg"
}) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size]
        )}
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
