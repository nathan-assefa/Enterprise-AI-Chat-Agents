import client from "../../graphql/apollo-client";
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "../../graphql/mutations/mutations";

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 1. First create a new guest
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail },
    });
    const guestId = guestResult.data.insertGuests.id;

    // 2. Intialize a new chat sessioin
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: { chatbot_id: chatbotId, guest_id: guestId },
    });
    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    // 3. Insert initial message (optional)
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}!\n How can I assist you today?`,
      },
    });
    console.log("New chat session started successfully");
    return chatSessionId;
  } catch (error) {
    console.error("Error starting new chat session", error);
  }
}

export default startNewChat;
