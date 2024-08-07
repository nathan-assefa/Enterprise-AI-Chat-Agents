import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { Bot } from "lucide-react";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex py-10 md:py-0 flex-1 justify-center items-center bg-purple-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center space-y-5 text-white">
          <div className="rounded-full bg-white p-5">
            <Bot className="h-60 w-60 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl">Bot Builder</h1>
            <h2 className="text-base font-light max-w-sm">
              Your easy-to-customize AI chat agent that helps you manage
              customer conversations effortlessly.
            </h2>
            <Button
              variant="ghost"
              className="hover:bg-inherit hover:text-gray-300"
            >
              Sign in to get started &rarr;
            </Button>
          </div>
        </div>
        <SignIn routing="hash" fallbackRedirectUrl="/" />
      </div>
    </div>
  );
};

export default LoginPage;
