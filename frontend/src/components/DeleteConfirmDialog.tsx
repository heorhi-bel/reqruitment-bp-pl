"use client";

import { useDeleteMessageMutation } from "@/store/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Props {
  messageId: number | null;
  onClose: () => void;
}

export function DeleteConfirmDialog({ messageId, onClose }: Props) {
  const [deleteMessage, { isLoading }] = useDeleteMessageMutation();

  const handleDelete = async () => {
    if (!messageId) return;
    try {
      await deleteMessage(messageId).unwrap();
      onClose();
    } catch {
      onClose();
    }
  };

  return (
    <AlertDialog open={!!messageId} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Usuń wiadomość</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz usunąć tę wiadomość? Tej operacji nie można cofnąć.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Usuwanie..." : "Usuń"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}