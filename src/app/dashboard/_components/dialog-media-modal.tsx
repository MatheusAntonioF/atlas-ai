"use client";

import { useCallback, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddMediaModal } from "./add-media-modal";

export function DialogMediaModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto h-8">Upload video</Button>
      </DialogTrigger>
      <AddMediaModal onCloseDialog={onCloseDialog} />
    </Dialog>
  );
}
