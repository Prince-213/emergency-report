"use client";

import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, LogOut } from "lucide-react";
import useSWR from "swr";
import { logoutStudent } from "@/lib/actions";

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());
export default function ProfilePage() {
  const { data, error, isLoading } = useSWR("/api/student", fetcher);

  const user = data?.data

  if (error) return null;

  console.log(data);

  if (isLoading)
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Loader2 className=" animate-spin" />
      </div>
    );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="container flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
             {/*  <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Department
                </Label>
                <p className="text-sm font-medium">{user.department}</p>
              </div> */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Registration Number
                </Label>
                <p className="text-sm font-medium">{user.matric}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Health Information
              </Label>
              <p className="text-sm">{user.medical[0]}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={logoutStudent}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>

       {/*  <Card>
          <CardHeader>
            <CardTitle className="text-lg">Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue={user.department} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input id="regNo" defaultValue={user.regNo} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="healthInfo">Health Information</Label>
              <Input id="healthInfo" defaultValue={user.healthInfo} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Changes</Button>
          </CardFooter>
        </Card> */}
      </main>

      <MainNav />
    </div>
  );
}
