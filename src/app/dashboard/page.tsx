import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddVideoModal from "./_components/add-video-modal";

export default function Component() {
  return (
    <>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto h-8">Upload video</Button>
          </DialogTrigger>
          <AddVideoModal />
        </Dialog>
      </div>
      <div className="mx-auto max-w-3xl"></div>
    </>
  );
}
