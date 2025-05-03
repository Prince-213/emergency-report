"use client";

import { MainNav } from "@/components/main-nav";
import { EmergencyCard } from "@/components/emergency-card";
import { EmergencyContacts } from "@/components/emergency-contacts";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Flame,
  Shield,
  Stethoscope,
  AlertTriangle,
  Loader2,
  Globe2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());
export default function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/student", fetcher);

  if (error) return null;

  console.log(data);

  if (isLoading)
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Loader2 className=" animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen pb-20 w-full">
      <header className="sticky w-full top-0 z-30 bg-background border-b">
        <div className=" flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold text-primary">CES</h1>
          <Globe2 />
        </div>
      </header>

      <main className=" w-full px-4 py-6 space-y-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Emergency Preparedness</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Your campus safety status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Safety Level</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2 bg-primary-foreground/20" />
            </div>
            <p className="mt-4 text-sm">
              You are well prepared for emergencies. Complete your profile to
              improve your safety score.
            </p>
            <Button variant="secondary" size="sm" className="mt-4">
              Improve
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-bold mb-4">Quick Report</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <EmergencyCard
              title="Fire"
              icon={Flame}
              description="Report fire emergency"
              href="/student/report/fire"
              className="border-red-200 hover:border-red-300"
              iconClassName="bg-red-100 text-red-600"
            />
            <EmergencyCard
              title="Security"
              icon={Shield}
              description="Report security threats"
              href="/student/report/security"
              className="border-blue-200 hover:border-blue-300"
              iconClassName="bg-blue-100 text-blue-600"
            />
            <EmergencyCard
              title="Medical"
              icon={Stethoscope}
              description="Request medical assistance"
              href="/student/report/medical"
              className="border-green-200 hover:border-green-300"
              iconClassName="bg-green-100 text-green-600"
            />
            <EmergencyCard
              title="Other"
              icon={AlertTriangle}
              description="Report other emergencies"
              href="/student/report/other"
              className="border-yellow-200 hover:border-yellow-300"
              iconClassName="bg-yellow-100 text-yellow-600"
            />
          </div>
        </div>

        <EmergencyContacts />

        {/* <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Campus Alerts</CardTitle>
            <CardDescription>
              Stay informed about recent incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg border">
                <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full h-fit">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Scheduled Fire Drill</h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    Today at 3:00 PM - All Buildings
                  </p>
                  <p className="text-xs">
                    Please follow evacuation procedures during the drill.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg border">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full h-fit">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    Campus Security Update
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    Yesterday - Security Department
                  </p>
                  <p className="text-xs">
                    New security measures implemented at dormitory entrances.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </main>

      <MainNav />
    </div>
  );
}

// New component to display location status

