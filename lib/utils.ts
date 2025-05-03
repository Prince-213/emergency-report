import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendEmail({
  message,
  email
}: {
  message: string;
  email: string;
}) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, email })
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error sending email:", errorDetails.message);
      return false;
    }

    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("There was a problem sending the email:", error);
    return false;
  }
}

export const getBaseUrl = (): string => {
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://medilabni.netlify.app";

  return siteUrl;
};
