"use client";

import { ChefHat, Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Recetas", href: "/recetas" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/85 backdrop-blur-md border-b border-border card-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl italic text-foreground">
              Mi Cocina
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "font-medium transition-all",
                    isActive && "bg-secondary shadow-sm"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                    className="justify-start"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}