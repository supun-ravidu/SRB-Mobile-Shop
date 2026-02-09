"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/mockData"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Derive unique brands from products
const ALL_BRANDS = Array.from(new Set(mockProducts.map(p => p.brand)))

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handle)
  }, [value, delay])

  return debounced
}

export default function SearchBar({
  className,
}: {
  className?: string
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("All")
  const [brand, setBrand] = React.useState("All")

  const debouncedQuery = useDebounce(query, 350)

  const { data: suggestions = [] } = useQuery({
    queryKey: ["search-suggestions", debouncedQuery, category, brand],
    queryFn: async () => {
      const normalized = debouncedQuery.trim().toLowerCase()
      if (!normalized) return []

      return mockProducts
        .filter((item) => {
          const matchesQuery =
            item.name.toLowerCase().includes(normalized) ||
            item.brand.toLowerCase().includes(normalized) ||
            item.description.toLowerCase().includes(normalized)
          const matchesCategory =
            category === "All" || item.category === category
          const matchesBrand = brand === "All" || item.brand === brand
          return matchesQuery && matchesCategory && matchesBrand
        })
        .slice(0, 8)
        .map((item) => ({
          name: item.name,
          brand: item.brand,
          category: item.category,
          image: item.image,
          price: item.price,
        }))
    },
    enabled: debouncedQuery.trim().length > 0,
  })

  const clearSearch = () => {
    setQuery("")
    setExpanded(false)
  }

  return (
    <div
      className={cn(
        "relative flex items-center gap-2",
        expanded ? "w-full" : "w-auto",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border bg-background/70 px-2 py-1 shadow-sm backdrop-blur transition-all",
          expanded ? "w-full" : "w-10"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search phones, accessories..."
          className={cn(
            "border-0 bg-transparent px-1 shadow-none focus-visible:ring-0",
            expanded ? "w-full" : "hidden"
          )}
        />
        {query && expanded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {expanded && (
        <div className="hidden items-center gap-2 lg:flex">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger size="sm" className="rounded-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {[
                "All",
                "Flagship",
                "Budget",
                "Accessories",
                "Refurbished",
              ].map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger size="sm" className="rounded-full">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {ALL_BRANDS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {expanded && suggestions.length > 0 && (
        <div className="absolute left-0 top-12 z-50 w-full rounded-xl border bg-background p-2 shadow-lg">
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
            Suggestions ({suggestions.length})
          </p>
          <div className="space-y-1">
            {suggestions.map((item) => (
              <button
                key={item.name}
                onClick={() => setQuery(item.name)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
              >
                <img src={item.image} alt={item.name} className="size-8 rounded-md object-contain bg-muted" />
                <div className="flex-1 min-w-0">
                  <span className="block truncate font-medium">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.brand} · {item.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
