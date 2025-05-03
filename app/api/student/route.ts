import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const id = cookieStore.get("id");

  const data = await prisma.student.findUnique({
    where: {
      id: id?.value
    },
    include: {
      reports: true
    }
  });

  console.log(data);

  return Response.json({ data });
}
