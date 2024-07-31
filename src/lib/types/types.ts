export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: Date;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: Date;
}

export interface Guest {
  id: number;
  name?: string;
  email?: string;
  created_at: Date;
}

export interface ChatSession {
  id: number;
  chatbot_id: number;
  guest_id?: number | null;
  created_at: Date;
  messages: Message[];
  guest?: Guest;
}

export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: Date;
  sender: string; // 'user' or 'ai'
}

export interface GetChatbotByIdResponse {
  chatbots: Chatbot;
}

export interface GetChatbotByIdVariables {
  id: string;
}

export interface GetChatbotByUserData {
  chatbotsByUser: Chatbot[];
}

export interface GetChatbotByUserDataVariables {
  clerk_user_id: string;
}

export interface GetUserChatbotsResponse {
  chatbotsByUser: Chatbot[];
}

export interface GetUserChatbotsVariables {
  clerk_user_id: string;
}

export interface GetChatSessionMessagesVariables {
  id: number;
}

export interface GetChatSessionsMessagesResponse {
  chat_sessions: {
    id: number;
    created_at: string;
    messages: Message[];
    chatbots: {
      name: string;
    };
    guests: {
      name: string;
      email: string;
    };
  };
}

export interface MessagesByChatSessionIdResponse {
  chat_sessions: ChatSession;
}

export interface MessagesByChatSessionIdVariables {
  chat_session_id: number;
}
