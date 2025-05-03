"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Shield, Ambulance, Flame } from "lucide-react"
import { useState } from "react"

interface EmergencyContact {
  name: string
  number: string
  icon: React.ReactNode
  color: string
}

export function EmergencyContacts() {
  const [expanded, setExpanded] = useState(false)

  const contacts: EmergencyContact[] = [
    {
      name: "Campus Security",
      number: "123-456-7890",
      icon: <Shield className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Medical Emergency",
      number: "123-456-7891",
      icon: <Ambulance className="h-4 w-4" />,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Fire Department",
      number: "123-456-7892",
      icon: <Flame className="h-4 w-4" />,
      color: "bg-orange-100 text-orange-700",
    },
  ]

  const displayedContacts = expanded ? contacts : contacts.slice(0, 1)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Emergency Contacts</CardTitle>
        <CardDescription>Call these numbers in case of emergency</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {displayedContacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${contact.color}`}>{contact.icon}</div>
              <div>
                <p className="font-medium text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.number}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full h-8 w-8 p-0"
              onClick={() => (window.location.href = `tel:${contact.number.replace(/-/g, "")}`)}
            >
              <Phone className="h-4 w-4" />
              <span className="sr-only">Call {contact.name}</span>
            </Button>
          </div>
        ))}
        {contacts.length > 1 && (
          <Button variant="ghost" size="sm" className="mt-1" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less" : "Show all contacts"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
