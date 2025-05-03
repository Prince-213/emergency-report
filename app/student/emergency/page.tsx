"use client"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Shield, Ambulance, Flame, AlertTriangle, MapPin } from "lucide-react"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      name: "Campus Security",
      number: "123-456-7890",
      description: "24/7 campus security services",
      icon: Shield,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Medical Emergency",
      number: "123-456-7891",
      description: "Campus health center and ambulance",
      icon: Ambulance,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Fire Department",
      number: "123-456-7892",
      description: "Fire emergencies and hazards",
      icon: Flame,
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Crisis Helpline",
      number: "123-456-7893",
      description: "Mental health and crisis support",
      icon: Phone,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Campus Facilities",
      number: "123-456-7894",
      description: "Building issues and maintenance",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-700",
    },
  ]

  const emergencyLocations = [
    {
      name: "Main Campus Health Center",
      location: "Building H, Ground Floor",
      hours: "24/7 Emergency Services",
    },
    {
      name: "Security Office",
      location: "Administration Building, Room 101",
      hours: "Open 24/7",
    },
    {
      name: "First Aid Stations",
      location: "Library, Cafeteria, Gym",
      hours: "Available during building hours",
    },
  ]

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="container flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold text-primary">Emergency Contacts</h1>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-700">Emergency? Call Now</CardTitle>
            <CardDescription className="text-red-600">
              For immediate assistance in life-threatening situations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8"
              onClick={() => (window.location.href = "tel:911")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Emergency Services (911)
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Campus Emergency Contacts</h2>
          {emergencyContacts.map((contact, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${contact.color}`}>
                    <contact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => (window.location.href = `tel:${contact.number.replace(/-/g, "")}`)}
                >
                  <Phone className="h-4 w-4" />
                  {contact.number}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Locations</CardTitle>
            <CardDescription>Know where to go during emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyLocations.map((location, index) => (
              <div key={index} className="flex gap-3 p-2 rounded-lg border">
                <div className="bg-muted p-2 rounded-full h-fit">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{location.name}</h3>
                  <p className="text-xs text-muted-foreground">{location.location}</p>
                  <p className="text-xs">{location.hours}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Procedures</CardTitle>
            <CardDescription>Basic guidelines for common emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Flame className="h-4 w-4 text-red-600" />
                Fire Emergency
              </h3>
              <p className="text-xs">
                1. Activate the nearest fire alarm
                <br />
                2. Call campus security
                <br />
                3. Evacuate the building using stairs
                <br />
                4. Assemble at designated meeting points
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Security Threat
              </h3>
              <p className="text-xs">
                1. Find a safe location and lock doors if possible
                <br />
                2. Silence your phone
                <br />
                3. Call campus security
                <br />
                4. Wait for official instructions
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Ambulance className="h-4 w-4 text-green-600" />
                Medical Emergency
              </h3>
              <p className="text-xs">
                1. Call campus health services
                <br />
                2. Do not move the injured person
                <br />
                3. If trained, provide first aid
                <br />
                4. Stay with the person until help arrives
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <MainNav />
    </div>
  )
}
