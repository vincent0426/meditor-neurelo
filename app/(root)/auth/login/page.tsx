import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/components/form/user-auth-form";
import NavbarLogo from "@/components/navbar-logo";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function AuthenticationPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative">
        <div className="absolute left-6 top-6">
          <NavbarLogo />
        </div>
        <div className="mx-auto flex size-full w-[350px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to continue to your account</p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <br />
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login.png"
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-cover brightness-[0.6] dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
