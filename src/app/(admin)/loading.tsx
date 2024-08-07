import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="mx-auto animate-spin p-10 flex items-center justify-center">
      <LoaderCircle className="w-8 h-8 text-primary" />
    </div>
  );
}

export default Loading;
