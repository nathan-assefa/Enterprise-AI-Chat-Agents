import serverClient from "@/lib/server/server-client";
import {
  Chatbot,
  GetUserChatbotsResponse,
  GetUserChatbotsVariables,
} from "@/lib/types/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { GET_USER_CHATBOTS } from "../../../../graphql/queries/queries";
import ChatbotSessions from "@/components/ChatbotSessions";

interface ReviewSessionsInterface {}

const ReviewSessions: React.FC<ReviewSessionsInterface> = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const {
    data: { chatbotsByUser },
  } = await serverClient.query<
    GetUserChatbotsResponse,
    GetUserChatbotsVariables
  >({ query: GET_USER_CHATBOTS, variables: { clerk_user_id: userId } });

  const sortedChatbotsByUser: Chatbot[] = chatbotsByUser.map((chatbot) => ({
    ...chatbot,
    chat_sessions: [...chatbot.chat_sessions].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));
  return (
    <div className="flex-1 px-10">
      {" "}
      <h1 className="text-xl lg:text-3xl font-semibold mt-10">Chat Sessions</h1>
      <h2 className="mb-5">
        View all the chat sessions your bots have had with customers.
      </h2>
      <ChatbotSessions chatbots={sortedChatbotsByUser} />
    </div>
  );
};

export default ReviewSessions;
