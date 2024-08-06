import serverClient from "@/lib/server/server-client";
import {
  GetChatbotByIdResponse,
  MessagesByChatSessionIdResponse,
} from "@/lib/types/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "../../../../graphql/queries/queries";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { INSERT_MESSAGE } from "../../../../graphql/mutations/mutations";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  console.log(
    `Received message from chat session ${chat_session_id}: ${content} (chatbot: ${chatbot_id})`
  );

  try {
    // step 1: Fetch chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });

    const chatbot = data.chatbots;

    if (!chatbot)
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });

    // Step 2: Fetch previous messages
    const { data: messageData } =
      await serverClient.query<MessagesByChatSessionIdResponse>({
        query: GET_MESSAGES_BY_CHAT_SESSION_ID,
        variables: { chat_session_id },
        fetchPolicy: "no-cache",
      });

    const previousMessages = messageData.chat_sessions.messages;

    const formattedPreviousMessages: ChatCompletionMessageParam[] =
      previousMessages.map((msg) => ({
        role: msg.sender === "ai" ? "system" : "user",
        name: msg.sender === "ai" ? "system" : name,
        content: msg.content,
      }));

    // Compibe charactristics into the system prompt
    const systemPrompt = chatbot.chatbot_characteristics
      .map((c) => c.content)
      .join(" + ");

    console.log("system msg: ", systemPrompt);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        name: "system",
        content: `You are a helpful assistant talking to ${name}. If a generic question is asked which is not
        relevant or in the same scope or domain as the points mentioned in the key information section, kindly
        inform the user they are only allowed to search for specific content. Use emojis where possible.
        Here are some key pieces of information that you need to be aware of. These are elements you may be asked about:
        ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      {
        role: "user",
        name: name,
        content: content,
      },
    ];

    // Step 3: Send the message to OpenAI's completions API
    const openaiResponse = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    const aiResponse = openaiResponse?.choices?.[0].message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to generate AI response" },
        { status: 500 }
      );
    }

    // Step 4: Save the user's message in the database
    await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content, sender: "user" },
    });

    // Step 5. Save the AI's response in the database
    const aiMessageResult = await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content, sender: "ai" },
    });

    // Step 6: Return the AI's response to the client
    return NextResponse.json({
      id: aiMessageResult.data.insertMessages.id,
      content: aiResponse,
    });
  } catch (error) {
    console.error("Error sending message", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
