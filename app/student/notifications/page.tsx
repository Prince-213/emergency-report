"use client"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Info, AlertTriangle, CheckCircle, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    title: "Campus-wide Fire Drill",
    message: "A fire drill will be conducted on May 25th at 2:00 PM. All students must evacuate buildings.",
    timestamp: "2023-05-20T09:00:00",
    type: "info",
    read: false,
  },
  {
    id: "2",
    title: "Security Alert",
    message: "Increased security measures in place due to recent incidents. Please carry your ID at all times.",
    timestamp: "2023-05-19T14:30:00",
    type: "warning",
    read: true,
  },
  {
    id: "3",
    title: "Your Report Status Updated",
    message: "Your security report #2 has been marked as resolved. Thank you for your report.",
    timestamp: "2023-05-18T11:15:00",
    type: "success",
    read: false,
  },
  {
    id: "4",
    title: "Emergency Contact Update",
    message: "Campus security contact numbers have been updated. Please check the emergency page.",
    timestamp: "2023-05-15T16:45:00",
    type: "info",
    read: true,
  },
  {
    id: "5",
    title: "Health Center Notice",
    message: "Free flu vaccinations available at the campus health center from May 26-28.",
    timestamp: "2023-05-14T10:20:00",
    type: "info",
    read: true,
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications =
    activeTab === "all"
      ? mockNotifications
      : activeTab === "unread"
        ? mockNotifications.filter((notification) => !notification.read)
        : mockNotifications.filter((notification) => notification.type === activeTab)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-blue-600" />
      default:
        return <Info className="h-4 w-4 text-primary" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "warning":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
            Alert
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            Success
          </Badge>
        )
      case "event":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            Event
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
            Info
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="container flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold">Notifications</h1>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
            {mockNotifications.filter((n) => !n.read).length} New
          </Badge>
        </div>
      </header>

      <main className="container px-4 py-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="warning">Alerts</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You {"don't"} have any {activeTab === "all" ? "" : activeTab} notifications
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? "" : "border-primary/50"}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                      </div>
                      {getNotificationBadge(notification.type)}
                    </div>
                    <CardDescription className="text-xs mt-1">{formatDate(notification.timestamp)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{notification.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MainNav />
    </div>
  )
}
