import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface EmergencyCardProps {
  title: string
  icon: LucideIcon
  description: string
  href: string
  className?: string
  iconClassName?: string
}

export function EmergencyCard({ title, icon: Icon, description, href, className, iconClassName }: EmergencyCardProps) {
  return (
    <Link href={href}>
      <Card className={cn("h-full cursor-pointer emergency-card", className)}>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className={cn("p-3 rounded-full mb-4", iconClassName)}>
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground text-center px-6 pb-6 pt-0">{description}</CardFooter>
      </Card>
    </Link>
  )
}
