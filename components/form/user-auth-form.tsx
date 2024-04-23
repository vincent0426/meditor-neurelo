"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/use-login";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useLogin("google");

  return (
    <div className={cn("mx-auto grid w-[350px] gap-6", className)} {...props}>
      <Button onClick={login} variant="outline">
        <Image src="/google.svg" alt="Google logo" width={24} height={24} className="border-none" />
        <p className="w-full text-center">Sign in with Google</p>
      </Button>
      <div className="relative inline-flex w-full items-center justify-center">
        <hr className="my-1 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-background px-3 font-medium text-gray-900  dark:text-white">
          or
        </span>
      </div>
      <div className="grid gap-4">
        <p className="text-sm text-destructive">Only Google login is supported at the moment</p>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
