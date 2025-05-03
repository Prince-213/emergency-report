"use client";

import type React from "react";

import { useEffect, useActionState } from "react";

import { loginStudent } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

const initialState = {
  message: ""
};
export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginStudent,
    initialState
  );

  useEffect(() => {
    if (state.message == "success") {
      toast.success("Loggin Successful");
    } else if (state.message == "unsuccess") {
      toast.error("Unsuccessful Login");
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Campus Emergency System
          </CardTitle>
          <CardDescription className="text-center">
            Login to report emergencies and stay safe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              {/*  {error && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )} */}
              <div className="grid gap-2">
                <Label htmlFor="matric">Enter your Matriculation Number</Label>
                <Input
                  id="matric"
                  type="text"
                  placeholder="209...."
                  name="matric"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                {pending ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/student/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-xs text-center text-muted-foreground mt-2">
            For emergency demo, use any email and password
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
