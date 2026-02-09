"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Sun className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Moon className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <span>System</span>
        </Button>
      </div>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={
          theme === "light"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground"
        }
        aria-label="Switch to light theme"
      >
        <motion.div whileHover={{ rotate: 8, scale: 1.05 }}>
          <Sun className="size-4" />
        </motion.div>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={
          theme === "dark"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground"
        }
        aria-label="Switch to dark theme"
      >
        <motion.div whileHover={{ rotate: -8, scale: 1.05 }}>
          <Moon className="size-4" />
        </motion.div>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("system")}
        className={
          theme === "system"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground"
        }
        aria-label="Use system theme"
      >
        <motion.span whileHover={{ scale: 1.05 }}>
          {currentTheme === "dark" ? "System Dark" : "System Light"}
        </motion.span>
      </Button>
    </div>
  )
}
