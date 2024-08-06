import Header from "@/components/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type LandingPageInterface = {
  children: React.ReactNode;
};

const LandingPage: React.FC<LandingPageInterface> = async ({ children }) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100">
        <div className=" flex-1 flex flex-col justify-center lg:justify-start items-start max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
