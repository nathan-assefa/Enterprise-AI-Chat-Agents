// import serverClient from "@/lib/server/server-client";
// import {
//   Chatbot,
//   GetChatbotByUserData,
//   GetChatbotByUserDataVariables,
// } from "@/lib/types/types";
// import { auth } from "@clerk/nextjs/server";
// import { GET_CHATBOT_BY_USER } from "../../../../graphql/queries/queries";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export const dynamic = "force-dynamic";

// async function ViewChatbots() {
//   const { userId } = await auth();
//   if (!userId) return;

//   const {
//     data: { chatbotsByUser },
//   } = await serverClient.query<
//     GetChatbotByUserData,
//     GetChatbotByUserDataVariables
//   >({
//     query: GET_CHATBOT_BY_USER,
//     variables: {
//       clerk_user_id: userId,
//     },
//   });

//   const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
//     (a, b) =>
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   );

//   return (
//     <div className="flex-1 pb-20 p-10">
//       <h1 className="text-xl lg:text-3xl font-semibold mb-5">
//         Active Chatbots
//       </h1>
//       {sortedChatbotsByUser.length === 0 && (
//         <div>
//           <p>
//             You have created any chatbots yet, click on the button betow to
//             create one
//           </p>
//           <Link href="/create-chatbot">
//             <Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
//               Create Chatbot
//             </Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewChatbots;

import serverClient from "@/lib/server/server-client";
import {
  Chatbot,
  GetChatbotByUserData,
  GetChatbotByUserDataVariables,
} from "@/lib/types/types";
import { auth } from "@clerk/nextjs/server";
import { GET_CHATBOT_BY_USER } from "../../../../graphql/queries/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  console.log("userId: ", userId);

  let chatbotsByUser: Chatbot[] = [];
  try {
    const { data } = await serverClient.query<
      GetChatbotByUserData,
      GetChatbotByUserDataVariables
    >({
      query: GET_CHATBOT_BY_USER,
      variables: {
        clerk_user_id: userId,
      },
    });
    // console.log("chatschats: ", data);

    if (data && data.chatbotsByUser) {
      chatbotsByUser = [...data.chatbotsByUser].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  } catch (error) {
    console.error("Error fetching chatbots:", error);
  }

  //   console.log("chats: ", chatbotsByUser);

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>
      {chatbotsByUser.length === 0 && (
        <div>
          <p>
            You have not created any chatbots yet, click on the button below to
            create one
          </p>
          <Link href="/create-chatbot">
            <Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
              Create Chatbot
            </Button>
          </Link>
        </div>
      )}

      <ul className="flex flex-col space-y-5">
        {chatbotsByUser.map((chatbot) => (
          <Link href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div>
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot.name} />
                  <h2 className="text-xl font-bold">{chatbot.name}</h2>
                </div>
                <p className="absolute top-5 right-5 text-xs text-gray-400">
                  Created: {new Date(chatbot.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ViewChatbots;

/*
import serverClient from "@/lib/server/server-client";
import {
  Chatbot,
  GetChatbotByUserData,
  GetChatbotByUserDataVariables,
} from "@/lib/types/types";
import { auth } from "@clerk/nextjs/server";
import { GET_CHATBOT_BY_USER } from "../../../../graphql/queries/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  console.log("userId: ", userId);

  let chatbotsByUser: Chatbot[] = [];
  try {
    const { data } = await serverClient.query<
      GetChatbotByUserData,
      GetChatbotByUserDataVariables
    >({
      query: GET_CHATBOT_BY_USER,
      variables: {
        id: 22,
      },
    });
    console.log("chatschats: ", data);

    if (data) {
      chatbotsByUser = [...data.chatbotsByUser].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  } catch (error) {
    console.error("Error fetching chatbots:", error);
  }

  console.log("chats: ", chatbotsByUser);

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>
      {chatbotsByUser.length === 0 && (
        <div>
          <p>
            You have not created any chatbots yet, click on the button below to
            create one
          </p>
          <Link href="/create-chatbot">
            <Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
              Create Chatbot
            </Button>
          </Link>
        </div>
      )}

      <ul className="flex flex-col space-y-5">
        {chatbotsByUser.map((chatbot) => (
          <Link href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div>
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot.name} />
                  <h2 className="text-xl font-bold">{chatbot.name}</h2>
                </div>
                <p className="absolute top-5 right-5 text-xs text-gray-400">
                  Created: {new Date(chatbot.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ViewChatbots;
*/
