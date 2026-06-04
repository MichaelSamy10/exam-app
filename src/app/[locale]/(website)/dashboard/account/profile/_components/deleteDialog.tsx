import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { TriangleAlertIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

type DeleteDialogProps = {
  handleDelete: () => void;
};

export default function DeleteDialog({
  handleDelete,
}: DeleteDialogProps) {
  // Translations
  const t = useTranslations('dashboard.profile-page');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-red-50 text-red-600 hover:bg-red-100"
          type="button"
        >
          {t('delete-account')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-9">
          <div className="mb-7 mt-4">
            <div className="relative m-auto flex h-[120px] items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-red-50"></div>
              <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <TriangleAlertIcon
                  width={50}
                  height={50}
                  className="font-light text-red-500"
                />
              </div>
            </div>
          </div>
          <div>
            <DialogTitle className="text-center text-lg font-medium text-red-600">
              {t('delete-dialog.title')}
            </DialogTitle>
            <DialogDescription
              className="text-center"
              style={{ marginTop: '0 !important' }}
            >
              {t('delete-dialog.description')}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mb-0 mt-auto flex h-24 items-center gap-4 bg-gray-50 px-4 pe-14 ps-14">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="flex-1 text-black"
            >
              {t('delete-dialog.cancel')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="button"
              className="flex-1"
              onClick={handleDelete}
            >
              {t('delete-dialog.delete')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
