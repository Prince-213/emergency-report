"use client";

import { createStudent } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  message: ""
};
export default function Random() {
  const [state, formAction, pending] = useActionState(
    createStudent,
    initialState
  );

  useEffect(() => {
    if (state.message == "success") {
      toast.success("Accound created");
    } else if (state.message == "unsuccess") {
      toast.error("Invalid credentials");
    }
  }, [state]);

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="h-screen">
        <div className="w-[90%] mx-auto pt-10  flex flex-col items-center">
          {/* Header */}

          {/* Body */}
          <div className="">
            <h1 className={"text-xl text-center font-light"}>
              Add a Student to the Database !
            </h1>
          </div>

          <div className=" flex flex-col justify-center mt-10">
            <form method="POST" action={formAction} className=" space-y-6">
              <input
                type="email"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter student email address"
                name="email"
                defaultValue={""}
              />
              <input
                type="password"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter password"
                name="password"
                defaultValue={""}
              />
              <input
                type="text"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter student Reg No."
                name="reg"
                defaultValue={""}
              />
              <input
                type="text"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Enter student Name"
                name="name"
                defaultValue={""}
              />
              <select
                name="gender"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2"
              >
                <option value={"male"}>Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="text"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-600 px-4 py-2 "
                placeholder="Student Medical condition (optional)"
                name="medical"
                defaultValue={""}
              />

              <button className=" bg-black mt-5 text-white flex items-center justify-center w-full py-5">
                <p>{pending ? "Creating student ..." : "Submit"}</p>
              </button>
            </form>
          </div>
        </div>

        <footer className=" w-[90%] mx-auto pt-5 text-center border-t-2 mt-20">
          <p>Call 234 987766344 </p>
          <p>To contact emergency services </p>
        </footer>
      </div>
    </main>
  );
}
