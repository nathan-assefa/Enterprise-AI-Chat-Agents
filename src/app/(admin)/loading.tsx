// import Avatar from "@/components/avatar";
import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="mx-auto animate-spin p-10 flex items-center justify-center">
      {/* <Avatar seed="This is the spinner for loading state" /> */}
      <LoaderCircle className="w-8 h-8 text-primary" />
    </div>
  );
}

export default Loading;
