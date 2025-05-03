"use client";

export const dynamic = 'force-dynamic';
export const revalidate = 1

import { loginUser } from "@/lib/actions";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { LuLoader } from "react-icons/lu";
import { toast } from "sonner";

const initialState = {
  message: ""
};
export default function Home() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state.message == "success") {
      toast.success("Login successful");
    } else if (state.message == "unsuccess") {
      toast.error("Invalid credentials");
    }
  }, [state.message]);

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="h-screen">
        <div className="w-[90%] mx-auto pt-10 h-[80vh]  flex flex-col items-center">
          {/* Header */}
          <div className="flex w-full  justify-center items-center">
            <div className=" space-y-5">
              <Image
                src={"/pngwing.com(7).png"}
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Body */}
          <div className="">
            <h1 className={"text-3xl text-center font-light"}>
              Welcome to Admin Quick Emergency Response !
            </h1>
          </div>

          <div className=" flex flex-col justify-center mt-10">
            <form method="POST" action={formAction} className=" space-y-6">
              <input
                type="text"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter your username"
                name="name"
                defaultValue={""}
              />
              <input
                type="password"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter password"
                name="password"
                defaultValue={""}
              />
              <button
                type="submit"
                className=" bg-black mt-5 text-white flex items-center justify-center w-full py-5"
              >
                {pending ? (
                  <div className=" flex items-center space-x-2">
                    <LuLoader className=" animate-spin" />
                    <p> Loggin in... </p>
                  </div>
                ) : (
                  <p>Log In</p>
                )}
              </button>
            </form>
          </div>
        </div>

        <footer className=" w-full mx-auto pt-5 text-center border-t-2 mt-20">
          <p>Call 234 987766344 </p>
          <p>To contact emergency services </p>
        </footer>
      </div>
    </main>
  );
}
