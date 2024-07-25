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
