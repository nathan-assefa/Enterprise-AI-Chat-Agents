import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ApolloProviderContainer from "@/components/ApolloProvider";
import { Toaster } from "sonner";
import { ChatbotListProvider } from "@/lib/providers/chat-bots-provider";

export const metadata: Metadata = {
  title: "Bot builder",
  description: "To generate as many chatbots as you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderContainer>
      <ClerkProvider>
        <html lang="en">
          <body className="min-h-screen flex">
            <ChatbotListProvider>{children}</ChatbotListProvider>{" "}
            <Toaster position="bottom-center" />
          </body>
        </html>
      </ClerkProvider>
    </ApolloProviderContainer>
  );
}
