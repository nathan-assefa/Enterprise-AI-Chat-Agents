"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import React, { FormEvent, useState } from "react";
import { CREATE_CHATBOT } from "../../../../graphql/mutations/mutations";
import { useRouter } from "next/navigation";
import { GitBranchPlus } from "lucide-react";

const CreateChatbot = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const [CreateChatbot, { data, loading, error }] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
        // created_at: new Date().toISOString(), // Add the current date and time
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await CreateChatbot();
      console.log("Mutation Response:", data);
      setName("");

      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <div
      className="flex flex-col items-center justify-center md:flex-row
    md:space-x-10 bg-white p-10 rounded-md sm:m-auto shadow-sm sm:shadow-lg"
    >
      <div>
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter flex items-center mx-auto justify-center">
            Create <GitBranchPlus className="w-4 h-4 text-primary ml-2" />
          </h1>
          <p className="text-muted-foreground">
            Create a new chatbot to help manage your customer service!
          </p>
          <div className="relative w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-2 mt-5"
            >
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chatbot Name..."
                className="max-w-lg"
                required
              />
            </form>
          </div>
          <Button disabled={loading || !name} className="w-full">
            {loading ? "Creating Chatbot..." : "Create Chatbot"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatbot;
