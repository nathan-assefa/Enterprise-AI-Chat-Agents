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

// import { Input } from "@/components/ui/input";

// async function ViewChatbots() {
//   const { userId } = await auth();
//   if (!userId) return;

//   console.log("userId: ", userId);

//   let chatbotsByUser: Chatbot[] = [];
//   try {
//     const { data } = await serverClient.query<
//       GetChatbotByUserData,
//       GetChatbotByUserDataVariables
//     >({
//       query: GET_CHATBOT_BY_USER,
//       variables: {
//         clerk_user_id: userId,
//       },
//     });

//     if (data && data.chatbotsByUser) {
//       chatbotsByUser = [...data.chatbotsByUser].sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching chatbots:", error);
//   }

//   return (
//     <div className="flex flex-col flex-1 bg-background text-foreground border w-screen mt-5">
//       {chatbotsByUser.length === 0 ? (
//         <div className="m-auto">
//           <h1 className="text-xl lg:text-3xl font-semibold mb-5">
//             Active Chatbots
//           </h1>

//           <div>
//             <p>
//               You have not created any chatbots yet, click on the button below
//               to create one
//             </p>
//             <Link href="/create-chatbot">
//               <Button className="bg-purple-500 text-white p-3 rounded-md mt-5">
//                 Create Chatbot
//               </Button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <header className="bg-purple-500 text-primary-foreground py-4 px-6 shadow-md">
//             <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
//               <Link
//                 href="#"
//                 className="text-lg sm:text-2xl font-bold mb-2"
//                 prefetch={false}
//               >
//                 Active Chatbots
//               </Link>
//               <div className="relative w-full max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <SearchIcon className="w-5 h-5 text-muted-foreground" />
//                 </div>
//                 <Input
//                   type="search"
//                   placeholder="Search for a film..."
//                   className="w-full pl-10 pr-4 py-2 rounded-md bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-50"
//                 />
//               </div>
//             </div>
//           </header>
//           <main className="">
//             <div className="">
//               <section>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border w-full">
//                   {chatbotsByUser.map((chatbot, i) => (
//                     <Link
//                       key={i}
//                       href={`/edit-chatbot/${chatbot.id}`}
//                       className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-md hover:bg-card-hover transition-colors cursor-pointer"
//                       prefetch={false}
//                     >
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold line-clamp-2 cursor-pointer">
//                           {chatbot.name}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-2">
//                           <span className="text-sm font-medium">
//                             Created:{" "}
//                             {new Date(chatbot.created_at).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }

// function SearchIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

// export default ViewChatbots;

"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";
import {
  Chatbot,
  GetChatbotByUserData,
  GetChatbotByUserDataVariables,
} from "@/lib/types/types";
import { GET_CHATBOT_BY_USER } from "../../../../graphql/queries/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

export function ViewChatbots() {
  const { userId } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!userId) return null;

  const { data, error, loading } = useQuery<
    GetChatbotByUserData,
    GetChatbotByUserDataVariables
  >(GET_CHATBOT_BY_USER, {
    variables: { clerk_user_id: userId },
  });

  if (loading)
    return (
      <div className="mx-auto animate-spin p-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 text-primary" />
      </div>
    );
  if (error) return <p>Error fetching chatbots: {error.message}</p>;

  let chatbotsByUser: Chatbot[] = [];
  if (data && data.chatbotsByUser) {
    chatbotsByUser = data.chatbotsByUser
      .filter((chatbot) =>
        chatbot.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  return (
    <div className="flex flex-col flex-1 bg-background text-foreground border w-screen mt-5">
      {chatbotsByUser.length === 0 && !data ? (
        <div className="m-auto">
          <h1 className="text-xl lg:text-3xl font-semibold mb-5">
            Active Chatbots
          </h1>
          <div>
            <p>
              You have not created any chatbots yet, click on the button below
              to create one
            </p>
            <Link href="/create-chatbot">
              <Button className="bg-purple-500 text-white p-3 rounded-md mt-5">
                Create Chatbot
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <header className="bg-purple-500 text-primary-foreground py-4 px-6 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
              <Link
                href="#"
                className="text-lg sm:text-2xl font-bold mb-2"
                prefetch={false}
              >
                Active Chatbots
              </Link>
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for a chatbot..."
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-primary-foreground text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </header>
          <main>
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border w-full">
                {chatbotsByUser.map((chatbot, i) => (
                  <Link
                    key={i}
                    href={`/edit-chatbot/${chatbot.id}`}
                    className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-md hover:bg-card-hover transition-colors cursor-pointer"
                    prefetch={false}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold line-clamp-2 cursor-pointer">
                        {chatbot.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-medium">
                          Created:{" "}
                          {new Date(chatbot.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default ViewChatbots;
