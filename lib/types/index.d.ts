interface Emergency {
  id: string;
  studentId: string;
  location: string;
  category: string;
  emergency: string;
  status: string;
  resolved: boolean;
  createdAt: Date;
}

interface Reports {
  id: string;
  reporter: string;
  email: string;
  category: string;
  severity: string;
  description: string;
  timeReported: Date;
  resolved: boolean;
  location: string;
}
