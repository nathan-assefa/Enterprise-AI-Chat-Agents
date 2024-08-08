"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Chatbot,
  GetChatbotByUserData,
  GetChatbotByUserDataVariables,
} from "../types/types";
import { GET_CHATBOT_BY_USER } from "../../../graphql/queries/queries";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@apollo/client";

interface ChatbotInterface {
  chatbotsByUser: Chatbot[];
  loading: boolean;
}

const useChatbotSource = (): ChatbotInterface => {
  const { userId } = useAuth();
  const [chatbotsByUser, setChatbotsByUser] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChatbots = async () => {
      if (!userId) return;

      try {
        const { data } = useQuery<
          GetChatbotByUserData,
          GetChatbotByUserDataVariables
        >(GET_CHATBOT_BY_USER, {
          variables: { clerk_user_id: userId },
        });

        console.log("data: ", data);

        if (data && data.chatbotsByUser) {
          const sortedChatbots = [...data.chatbotsByUser].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setChatbotsByUser(sortedChatbots);
        }
      } catch (error) {
        console.error("Error fetching chatbots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();
  }, [userId]);
  console.log("chatbots", chatbotsByUser);

  return { chatbotsByUser, loading };
};

const ChatbotContext = createContext<ReturnType<typeof useChatbotSource>>(
  {} as ReturnType<typeof useChatbotSource>
);

export const useChatbotList = () => {
  return useContext(ChatbotContext);
};

export const ChatbotListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chatbotSource = useChatbotSource();

  return (
    <ChatbotContext.Provider value={chatbotSource}>
      {children}
    </ChatbotContext.Provider>
  );
};
