"use client";

import { useState, useEffect } from "react";
import { useUpdateMessageMutation } from "@/store/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Message } from "@/store/api";

interface Props {
  message: Message | null;
  onClose: () => void;
}

export function EditMessageDialog({ message, onClose }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [updateMessage, { isLoading }] = useUpdateMessageMutation();

  useEffect(() => {
    if (message) setText(message.message);
  }, [message]);

  const handleSave = async () => {
    if (!text.trim()) {
      setError("Wiadomość nie może być pusta.");
      return;
    }
    setError("");
    try {
      await updateMessage({ id: message!.id, message: text.trim() }).unwrap();
      onClose();
    } catch {
      setError("Błąd podczas edycji wiadomości.");
    }
  };

  return (
    <Dialog open={!!message} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj wiadomość</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-2">
          <Label htmlFor="edit-message">Treść wiadomości</Label>
          <Input
            id="edit-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          {error && <p className="text-sm text-destructive destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}