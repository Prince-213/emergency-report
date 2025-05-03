"use server";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { GrEmergency } from "react-icons/gr";

const DashComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow-sm w-full flex items-center ">
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-3 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <div className=" flex items-center space-x-2">
            <GrEmergency />
            <p className=" text-xs"> +234 908-866</p>
          </div>
        </div>

        <Button className=" w-full flex items-center space-x-2">
          <LogOut />
          <p>Logout</p>
        </Button>
      </header>
      {children}
      <footer className=" border-t-2 py-4">
        <p className=" text-xs max-w-[90%] mx-auto text-center">
          Remember to always call the local emergency number (such as 911 in the
          US) in case of a life-threatening emergency.
        </p>
      </footer>
    </div>
  );
};

export default DashComponent;
