import { Button } from "@/components/ui/button";
import { Sidebar } from "./_components/sidebar";
import { Header } from "./_components/header";

export default function Component() {
  return (
    <>
      <div className="flex items-center">
        <Button className="ml-auto h-8" size="sm" variant="outline">
          Upload video
        </Button>
      </div>
      <div className="mx-auto max-w-3xl"></div>
    </>
  );
}
