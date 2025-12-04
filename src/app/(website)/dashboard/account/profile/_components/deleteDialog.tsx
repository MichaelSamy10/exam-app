import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TriangleAlertIcon } from "lucide-react";
import React from "react";

type DeleteDialogProps = {
  handleDelete: () => void;
};

export default function DeleteDialog({ handleDelete }: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-red-50 text-red-600 hover:bg-red-100"
          type="button"
        >
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-9">
          <div className="mb-7 mt-4">
            <div className="relative h-[120px] flex items-center justify-center m-auto">
              <div className="absolute w-28 h-28 bg-red-50 rounded-full"></div>
              <div className="absolute w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <TriangleAlertIcon
                  width={50}
                  height={50}
                  className="text-red-500 font-light"
                />
              </div>
            </div>
          </div>
          <div>
            <DialogTitle className="text-red-600 text-lg font-medium text-center">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription
              className="text-center"
              style={{ marginTop: "0 !important" }}
            >
              This action is permanent and cannot be undone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex items-center gap-4 h-24 mt-auto bg-gray-50 px-4 mb-0 ps-14 pe-14">
          <DialogClose asChild>
            <Button variant="secondary" className="flex-1 text-black">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="button"
            className="flex-1"
            onClick={handleDelete}
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
