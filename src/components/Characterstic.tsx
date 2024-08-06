import { ChatbotCharacteristic } from "@/lib/types/types";
import { useMutation } from "@apollo/client";
import { SquareX } from "lucide-react";
import React from "react";
import { REMOVE_CHARACTERISTIC } from "../../graphql/mutations/mutations";
import { toast } from "sonner";

interface CharactersticInterface {
  characteristic: ChatbotCharacteristic;
}

const Characteristic: React.FC<CharactersticInterface> = ({
  characteristic,
}) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const handleRemoveCharacteristic = async () => {
    try {
      await removeCharacteristic({
        variables: {
          characteristicId: characteristic.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}
      <SquareX
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={() => {
          const promise = handleRemoveCharacteristic();
          toast.promise(promise, {
            loading: "Removing...",
            success: "Characteristic removed",
            error: "Failed to remove characteristic",
          });
        }}
      />
    </li>
  );
};

export default Characteristic;
