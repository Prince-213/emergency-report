"use server";

import { getStudents } from "@/lib/actions";
import EmergencyDashboard from "@/lib/components/ResponseDash";
import React from "react";

const DashHome = async () => {
  const students = await getStudents();

  const emergencyReports = students.flatMap((student) =>
    student.reports.map((report) => ({
      id: report.id,
      reporter: student.name,
      email: student.email,
      category: report.category,
      severity: report.status,
      description: report.emergency,
      timeReported: report.createdAt,
      resolved: report.resolved,
      location: report.location
    }))
  );

  return <EmergencyDashboard emergencyReports={emergencyReports} />;
};

export default DashHome;
