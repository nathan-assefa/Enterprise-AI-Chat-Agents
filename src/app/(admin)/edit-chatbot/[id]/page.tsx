"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { BASE_URL } from "../../../../../graphql/apollo-client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Avatar from "@/components/avatar";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
} from "@/lib/types/types";
import { GET_CHATBOT_BY_ID } from "../../../../../graphql/queries/queries";
import Characteristic from "@/components/Characterstic";
import {
  ADD_CHARACTERISTIC,
  DELETE_CHATBOT,
  UPDATE_CHATBOT,
} from "../../../../../graphql/mutations/mutations";
import { redirect } from "next/navigation";

interface EditChatbotInterface {
  params: { id: string };
}

const EditChatbot: React.FC<EditChatbotInterface> = ({ params: { id } }) => {
  const [url, setUrl] = useState<string>("");
  const [chatbotName, setChatbotName] = useState<string>("");
  const [newCharacterstic, setNewCharacterstic] = useState<string>("");
  // console.log(newCharacterstic);

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"], // reftech the chatbot after deletion
    awaitRefetchQueries: true,
  });

  const [updateChatbot, { loading: LoadingUpdatingChatbot }] = useMutation(
    UPDATE_CHATBOT,
    {
      refetchQueries: ["GetChatbotById"],
    }
  );

  const [addCharacteristic] = useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const { data, loading, error } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  const handleDeleteChatBot = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot?"
    );

    if (!isConfirmed) return;

    try {
      const promise = deleteChatbot({ variables: { id } });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Chatbot Successfully deleted!",
        error: "Failed to delete chatbot",
      });
    } catch (error) {
      console.error("Error deleting the chatbot", error);
      toast.error("Failed to delete chatbot");
    }
  };

  const handleUpdataChatbot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const promise = updateChatbot({
        variables: {
          id,
          name: chatbotName,
        },
      });

      toast.promise(promise, {
        loading: "Updating...",
        success: "Chatbot Name Successfully updated",
        error: "Failed to update chatbot",
      });
    } catch (error) {
      console.error("Failed to update chatbot: ", error);
    }
  };

  const handleAddCharacteristic = async (content: string) => {
    try {
      console.log("Attempting to add characteristic with content:", content);
      const { data } = await addCharacteristic({
        variables: {
          chatbotId: Number(id),
          content,
        },
      });
      console.log("Mutation response data:", data);

      if (data?.insertChatbot_characteristics) {
        toast.success("Information added");
      } else {
        throw new Error("No data returned from mutation");
      }
    } catch (error) {
      console.error("Failed to add characteristic:", error);
      toast.error("Failed to add information");
    }
  };

  if (loading)
    return (
      <div className="mx-auto animate-spin p-10">
        <Avatar seed="My agenet" />
      </div>
    );

  if (error) return <p>Error:</p>;

  if (!data?.chatbots) return redirect("/view-chatbots");

  console.log(LoadingUpdatingChatbot);

  return (
    <div className="px-0 md:p-10 m-5">
      <div
        className="
        md:sticky
        md:top-0
        z-50
        sm:max-w-full
        ml-auto
        space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-primary
        "
      >
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start conversations with your
          chatbot
        </p>
        <div className="flex items-center space-x-2">
          {" "}
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer" />
          </Link>{" "}
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Copied to Clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          variant="destructive"
          className="absolute top-2 right-2 h-8 w-2"
          onClick={() => handleDeleteChatBot(id)}
        >
          X
        </Button>

        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
            onSubmit={handleUpdataChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder={chatbotName}
              className="w-full border-none bg-transparent text-xl font-bold"
              required
            />
            <Button
              type="submit"
              disabled={!chatbotName || LoadingUpdatingChatbot}
            >
              {LoadingUpdatingChatbot ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-16">
          Here's is what your AI knows...
        </h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your customers & users
        </p>

        <div className="bg-gray-200 p-5 md:p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacteristic(newCharacterstic);
              setNewCharacterstic("");
            }}
            className="flex items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Example: If customer asks for prices, provide pricing page: www.example.com/pricing"
              value={newCharacterstic}
              onChange={(e) => setNewCharacterstic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacterstic}>
              Add
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5 mt-5">
            {data?.chatbots.chatbot_characteristics.map((characteristic) => (
              <Characteristic
                key={characteristic.id}
                characteristic={characteristic}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EditChatbot;
