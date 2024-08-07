import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import { DELETE_CHATBOT } from "../../graphql/mutations/mutations";
import { toast } from "sonner";

interface CustomDialogTriggerProps {
  header?: string;
  content?: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  id?: string;
}

const CustomDialogTrigger: React.FC<CustomDialogTriggerProps> = ({
  header,
  content,
  children,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    awaitRefetchQueries: true,
  });

  const handleDeleteChatBot = async (id: string) => {
    try {
      setIsLoading(true);
      const promise = deleteChatbot({ variables: { id } });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Chatbot successfully deleted!",
        error: "Failed to delete chatbot",
      });
      await promise;
      // Close the dialog after successful deletion
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting the chatbot", error);
      toast.error("Failed to delete chatbot");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
          <div className="flex space-x-4 items-center justify-center pt-4">
            <Button
              onClick={() => handleDeleteChatBot(id!)}
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="ghost"
              className="bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogTrigger;
