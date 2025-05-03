"use client";

export const dynamic = "force-dynamic";
export const revalidate = 1;

import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Shield,
  Stethoscope,
  AlertTriangle,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";
import useSWR from "swr";

// Mock data for reports

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ReportsPage() {
  const { data, error, isLoading } = useSWR("/api/student", fetcher);
  const [activeTab, setActiveTab] = useState(true);

  const reports = data?.data.reports;

  const getIcon = (type: string) => {
    switch (type) {
      case "fire":
        return <Flame />;

      case "medical":
        return <Stethoscope />;
        break

      case "security":
        return <Shield />;

      default:
        return <AlertTriangle />;
    }
  };

  const filteredReports =
    activeTab
      ? reports
      : reports.filter((report: { status: boolean; }) => report.status === activeTab);

  if (error) return null;

  console.log(reports);

  if (isLoading)
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Loader2 className=" animate-spin" />
      </div>
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold">My Reports</h1>
        </div>
      </header>

      <main className="container px-4 py-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value={true}>All</TabsTrigger>
            <TabsTrigger value={false}>Pending</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredReports?.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No reports found</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab 
                      ? "You haven't submitted any reports yet"
                      : `You don't have any ${activeTab} reports`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredReports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full bg-red-200 text-red-500 `}
                        >
                          {/* <report.icon className={`h-4 w-4 `} /> */}
                          {getIcon(report.category)}
                        </div>
                        <CardTitle className="text-base capitalize">
                          {report.category} Emergency
                        </CardTitle>
                      </div>
                      <Badge variant={report.resolved ? "outline" : "default"}>
                        {report.resolved ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {report.resolved ? "Resolved" : "Pending"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs mt-2">
                      Reported on {formatDate(report.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">{report.emergency}</p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Location:</strong> {report.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MainNav />
    </div>
  );
}
