"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";

import { useActionState } from "react";
import { toast } from "sonner";
import { answerThreat } from "../actions";

// Mock data for emergency reports

const initialState = {
  message: ""
};

export default function EmergencyDashboard({
  emergencyReports
}: {
  emergencyReports: Reports[];
}) {
  const [state, formAction, pending] = useActionState(
    answerThreat,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      toast.success("Report submitted successfully");
    } else if (state.message === "unsuccess") {
      toast.error("Failed to submit report");
    }
  }, [state.message]);

  const [selectedEmergency, setSelectedEmergency] = useState<Reports | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [reports, setReports] = useState<Reports[]>(emergencyReports);

  const handleViewDetails = (emergency) => {
    setSelectedEmergency(emergency);
    setIsModalOpen(true);
    setResponseMessage("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 capitalize">
            {severity}
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 capitalize">
            {severity}
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 capitalize">
            {severity}
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 capitalize">
            {severity}
          </Badge>
        );
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "medical":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            {category}
          </Badge>
        );
      case "fire":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-500"
          >
            {category}
          </Badge>
        );
      case "security":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            {category}
          </Badge>
        );
      case "facility":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            {category}
          </Badge>
        );
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Emergency Reports Dashboard
          </CardTitle>
          <CardDescription>
            Monitor and respond to emergency reports across the facility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{getCategoryBadge(report.category)}</TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell>
                    {report.resolved ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        Resolved
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 border-red-300"
                      >
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(report)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedEmergency && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Emergency Report Details</DialogTitle>
              <DialogDescription>
                ID: {selectedEmergency.id} | Reported:{" "}
                {formatDate(selectedEmergency.timeReported)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Reporter:</div>
                <div className="col-span-3">{selectedEmergency.reporter}</div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Category:</div>
                <div className="col-span-3">
                  {getCategoryBadge(selectedEmergency.category)}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Severity:</div>
                <div className="col-span-3">
                  {getSeverityBadge(selectedEmergency.severity)}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Location:</div>
                <div className="col-span-3">{selectedEmergency.location}</div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Status:</div>
                <div className="col-span-3">
                  {selectedEmergency.resolved ? (
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        Resolved
                      </Badge>
                      {/* <div className="mt-1 text-sm text-gray-500">
                        Resolved on {formatDate(selectedEmergency.resolvedTime)}{" "}
                        by {selectedEmergency.resolvedBy}
                      </div> */}
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-100 text-red-800 border-red-300"
                    >
                      Pending
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Description:</div>
                <div className="col-span-3">
                  {selectedEmergency.description}
                </div>
              </div>

              {!selectedEmergency.resolved && (
                <form action={formAction} method="POST" className=" space-y-5">
                  <input
                    type="text"
                    name="id"
                    id="id"
                    value={selectedEmergency.id}
                    className=" hidden"
                  />
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    value={selectedEmergency.email}
                    className=" hidden"
                  />
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <div className="font-medium">Response Message:</div>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your response message here..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit">
                    {pending ? "Resolving complaint...." : "Resolve complaint"}
                  </Button>
                </form>
              )}
              {/* 
              {selectedEmergency.responseMessage && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  <div className="font-medium">Response Message:</div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedEmergency.responseMessage}
                  </div>
                </div>
              )} */}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
