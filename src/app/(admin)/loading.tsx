import Avatar from "@/components/avatar";

function Loading() {
  return (
    <div className="mx-auto animate-spin p-10">
      <Avatar seed="This is the spinner for loading state" />
    </div>
  );
}

export default Loading;
