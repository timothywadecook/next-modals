import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { stocks } from "@/lib/data"
import { cn } from "@/lib/utils"

import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50">
      <section>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-72 border">
                Pick a stock
              </NavigationMenuTrigger>
              <NavigationMenuContent className="max-h-72 overflow-scroll">
                {stocks.map((s) => (
                  <Link
                    className=""
                    key={s.symbol}
                    href={`/chart/${s.symbol}/100`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "w-72")}
                    >
                      {s.displayName}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </main>
  )
}
