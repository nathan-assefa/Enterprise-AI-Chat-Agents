import serverClient from "@/lib/server/server-client";
import {
  GetChatSessionMessagesVariables,
  GetChatSessionsMessagesResponse,
} from "@/lib/types/types";
import React from "react";
import { GET_CHAT_SESSION_MESSAGES } from "../../../../../graphql/queries/queries";
import Messages from "@/components/messages";

interface ReviewSessionInterface {
  params: { id: string };
}

const ReviewSession: React.FC<ReviewSessionInterface> = async ({
  params: { id },
}) => {
  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: { name },
        guests: { name: guestName, email },
      },
    },
  } = await serverClient.query<
    GetChatSessionsMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id) },
  });
  console.log("messages: ", messages);
  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <div>
        <p className="font-light text-xs text-gray-400 mt-2">
          Started at {new Date(created_at).toLocaleString()}
        </p>
        <h2 className="font-light mt-2">
          Between {name} &{" "}
          <span className="font-extrabold">
            {guestName} ({email})
          </span>
        </h2>

        <hr className="my-10" />

        <Messages messages={messages} chatbotName={name} />
      </div>
    </div>
  );
};

export default ReviewSession;
