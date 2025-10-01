"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, BarChart3, Calendar, Settings, Bell } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "Heatwave",
      icon: Thermometer,
      description: "Heat risk monitoring",
    },
    {
      href: "/drought",
      label: "Drought",
      icon: Droplets,
      description: "Water risk assessment",
    },
  ]

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img 
                src="/images/logo.png"
                alt="New HeatDetect Logo" 
                className="h-22 w-22"
              />  
            </div>
            <Badge variant="secondary" className="ml-2">
              Climate Risk Management System
            </Badge>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
            <Badge variant="outline">Local Government Unit</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
