"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SearchBar from "@/components/SearchBar"
import ThemeToggle from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const brandLinks = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Huawei",
]

export default function Navbar() {
  const [cartCount] = React.useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/60">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Phone className="size-5" />
          </div>
          <div>
            <Link href="/" className="text-lg font-semibold">
              SRB Mobile Shop
            </Link>
            <p className="text-xs text-muted-foreground">Premium gadgets</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                Brands
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44">
              {brandLinks.map((brand) => (
                <DropdownMenuItem key={brand}>{brand}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks.slice(2).map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden flex-1 justify-center lg:flex">
          <SearchBar className="max-w-xl" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="size-4" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <div className="relative">
                <ShoppingCart className="size-4" />
                <Badge className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-[10px]">
                  {cartCount}
                </Badge>
              </div>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="User profile">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>SRB Mobile Shop</SheetTitle>
                <SheetDescription>
                  Explore premium devices and deals.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3">
                {[...navLinks, { label: "Brands", href: "#brands" }].map(
                  (link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <div className="mt-auto space-y-3">
                <SearchBar className="w-full" />
                <div className="flex flex-wrap gap-2">
                  {brandLinks.map((brand) => (
                    <span
                      key={brand}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs text-muted-foreground",
                        "bg-background"
                      )}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
