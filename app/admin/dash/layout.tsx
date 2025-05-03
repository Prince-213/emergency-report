export const dynamic = "force-dynamic";
export const revalidate = 1;

import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/lib/actions";
import { LogOut } from "lucide-react";
import { GrEmergency } from "react-icons/gr";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full ">
        <header className="bg-white pr-10 shadow-sm w-full flex items-center justify-between">
          <div className="mx-auto w-[90%] px-4 py-6 space-y-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <div className=" flex items-center space-x-2">
              <GrEmergency />
              <p className=" text-xs"> +234 908-866</p>
            </div>
          </div>
          <Button
            onClick={logoutAdmin}
            className=" w-fit flex items-center space-x-2"
          >
            <LogOut />
            <p>Logout</p>
          </Button>
        </header>
        <div className=" h-[80vh]">{children}</div>
        <footer className=" border-t-2 py-4">
          <p className=" text-xs max-w-[90%] mx-auto text-center">
            Remember to always call the local emergency number (such as 911 in
            the US) in case of a life-threatening emergency.
          </p>
        </footer>
      </div>
    </>
  );
}
