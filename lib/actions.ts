"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from "next/navigation";
import { prisma } from "./db/prisma";

import { cookies } from "next/headers";
import { sendEmail } from "./utils";

export const createStudent = async (prevState: any, formData: FormData) => {
  console.log(formData);

  try {
    await prisma.student.create({
      data: {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        matric: formData.get("reg")?.toString() || "",
        name: formData.get("name")?.toString() || "",
        gender: formData.get("gender")?.toString() || "",
        medical: [formData.get("medical")?.toString() || ""]
      }
    });

    return {
      message: "success"
    };
  } catch (error) {
    console.error(error);

    return {
      message: "unsuccess"
    };
  }
};

export const loginUser = async (prevState: any, formData: FormData) => {
  const name = formData.get("name")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (name === "Chris10chidera" && password === "10175") {
    const cookieStore = await cookies();
    // Encode the cookie value to handle special characters
    cookieStore.set("admin", encodeURIComponent("4949d"), {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      path: "/"
    });

    return redirect("/admin/dash");
    // Note: The code after redirect won't execute, so remove the second return
  } else {
    return { message: "Invalid credentials" };
  }
};

export const getStudent = async () => {
  const cookieStore = await cookies();

  const id = cookieStore.get("id")?.value;

  const data = await prisma.student.findUnique({
    where: {
      id: id
    },
    include: {
      reports: true
    }
  });

  return data;
};

export const getStudents = async () => {
  const data = prisma.student.findMany({
    include: {
      reports: true
    }
  });

  console.log(data);

  return data;
};

export const reportThreat = async (prevState: any, formData: FormData) => {
  console.log(formData);

  const cookieStore = await cookies();

  const matric = cookieStore.get("id")?.value || "";

  try {
    await prisma.emergency.create({
      data: {
        location: formData.get("location")?.toString() || "",
        emergency: formData.get("emergency")?.toString() || "",
        status: formData.get("status")?.toString() || "",
        category: formData.get("category")?.toString() || "",
        studentId: matric
      }
    });

    console.log("done");

    return { message: "success" };
  } catch (err) {
    console.error(err);
    return { message: "unsucess" };
  }
};

export const answerThreat = async (prevState: any, formData: FormData) => {
  console.log(formData);

  const mail = formData.get("mail")?.toString() ?? "";
  const id = formData.get("id")?.toString() ?? "";

  try {
    await prisma.emergency.update({
      where: {
        id: id
      },
      data: {
        resolved: true
      }
    });

    console.log("done");

    await sendEmail({
      email: mail,
      message: formData.get("message")?.toString() ?? ""
    });

    return { message: "success" };
  } catch (err) {
    console.error(err);
    return { message: "unsucess" };
  }
};

export const loginStudent = async (prevState: any, formData: FormData) => {
  // In a real app, you would validate credentials with an API
  // For demo purposes, we'll accept any login and use mock data

  const matric = formData.get("matric")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  console.log(matric);
  console.log(password);

  const data = await prisma.student.findUnique({
    where: {
      matric: matric
    }
  });

  if (data) {
    if (data?.password === password) {
      const cookieStore = await cookies();
      cookieStore.set("email", data.email, { secure: true });
      cookieStore.set("name", data.name, { secure: true });

      cookieStore.set("id", data.id, { secure: true });

      return redirect("/student/dashboard"); // ✅ Return redirect instead of just calling it
    } else {
      return { message: "unsuccess" };
    }
  } else {
    return { message: "not" };
  }
};
/* 
export const logout = () => {}; */
export const logoutStudent = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("id");
  cookieStore.delete("name");
  cookieStore.delete("email");
  redirect("/");
};

export const logoutAdmin = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("admin");

  redirect("/");
};
