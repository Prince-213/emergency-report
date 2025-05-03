/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const dynamic = "force-dynamic";
export const revalidate = 1;

import type React from "react";

import { useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MainNav } from "@/components/main-nav";
import { useLocation } from "@/components/location-provider";
import { LocationProvider } from "@/components/location-provider";
import {
  Flame,
  Shield,
  Stethoscope,
  AlertTriangle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { reportThreat } from "@/lib/actions";
import { toast } from "sonner";

const emergencyTypes = {
  fire: {
    title: "Fire Emergency",
    description: "Report a fire or smoke incident",
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  security: {
    title: "Security Threat",
    description: "Report suspicious activity or security concerns",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  medical: {
    title: "Medical Emergency",
    description: "Request medical assistance",
    icon: Stethoscope,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  other: {
    title: "Other Emergency",
    description: "Report other types of emergencies",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  }
};

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const emergencyType = params.type as string;
  const typeInfo = emergencyTypes[emergencyType as keyof typeof emergencyTypes];

  if (!typeInfo) {
    router.push("/dashboard");
    return null;
  }

  const Icon = typeInfo.icon;

  return (
    <LocationProvider>
      <ReportForm
        typeInfo={typeInfo}
        emergencyType={emergencyType}
        Icon={Icon}
      />
      <MainNav />
    </LocationProvider>
  );
}

const initialState = {
  message: ""
};

function ReportForm({
  typeInfo,
  emergencyType,
  Icon
}: {
  typeInfo: any;
  emergencyType: string;
  Icon: any;
}) {
  const router = useRouter();

  console.log(emergencyType);

  const {
    coordinates,
    locationError,
    isLoading,
    refreshLocation,
    usingMockLocation
  } = useLocation();

  const [state, formAction, pending] = useActionState(
    reportThreat,
    initialState
  );

  useEffect(() => {
    if (state.message == "success") {
      toast.success("Report submitted successfully");
    } else if (state.message == "unsuccess") {
      toast.error("Error while trying to submit report");
    }
  }, [state]);

  const locationString =
    coordinates.latitude && coordinates.longitude
      ? `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
      : "";

  // Use manual location if provided, otherwise use coordinates
  const displayLocation = locationString;

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold ml-2">{typeInfo.title}</h1>
        </div>
      </header>

      <main className=" px-4 py-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${typeInfo.bgColor} ${typeInfo.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>{typeInfo.title}</CardTitle>
                <CardDescription>{typeInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form action={formAction} method="POST" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency">Description</Label>
                <Textarea
                  id="emergency"
                  placeholder="Describe the emergency situation in detail..."
                  name="emergency"
                  rows={4}
                  required
                />
              </div>
              <div className=" w-full py-4">
                <Label htmlFor="status">Threat Level</Label>
                <select
                  name="status"
                  id="status"
                  className=" w-full p-4 rounded-md border-2 "
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location">Your Location</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={refreshLocation}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Refresh"
                    )}
                  </Button>
                </div>
                <Input
                  id="location"
                  defaultValue={displayLocation}
                  name="location"
                  className={usingMockLocation ? "bg-yellow-50" : "bg-muted"}
                />
                {locationError && (
                  <p className="text-xs text-amber-600">{locationError}</p>
                )}
                {usingMockLocation && (
                  <p className="text-xs text-amber-600">
                    Using default campus coordinates. Please update if needed.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Your coordinates will help emergency responders locate you
                  quickly
                </p>
              </div>
              <div>
                <input
                  type="text"
                  defaultValue={emergencyType.toLowerCase()}
                  name="category"
                  id="category"
                  className=" opacity-0"
                />
              </div>
              <Button className="w-full" type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Emergency Report"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
