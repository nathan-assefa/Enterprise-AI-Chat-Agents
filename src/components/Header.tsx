// import Link from "next/link";
// import React from "react";
import Avator from "./avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// const Header = () => {
//   return (
//     <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
//       <Link href="/" className="flex items-center text-4xl font-thin">
//         <Avator seed="PAPAFAM Support Agent" />
//         <div className="space-y-1">
//           <h1 className="">Assistly</h1>
//           <h2 className="text-sm">Your Customisable AI Chat Agent</h2>
//         </div>
//       </Link>

//       <div className="flex items-center">
//         <SignedIn>
//           <UserButton showName />
//         </SignedIn>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//       </div>
//     </header>
//   );
// };

// export default Header;

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
          <Link href="/">
            <p className="flex items-center text-xl">
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
