import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";

const Navbar = () => {
  return (
    <div className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="cursor-pointer">
            <p className="flex items-center text-xl cursor-pointer font-bold">
              Bot<span className="text-primary">Builder</span>
            </p>
          </Link>

          <div className="flex items-center">
            <SignedIn>
              <UserButton showName />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
