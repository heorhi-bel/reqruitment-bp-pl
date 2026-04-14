"use client";

import { useState } from "react";
import { useAddMessageMutation } from "@/store/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddMessageForm() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Wiadomość nie może być pusta.");
      return;
    }
    setError("");
    try {
      await addMessage({ message: text.trim() }).unwrap();
      setText("");
    } catch {
      setError("Błąd podczas dodawania wiadomości.");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg bg-card">
      <Label htmlFor="message">Nowa wiadomość</Label>
      <div className="flex gap-2">
        <Input
          id="message"
          placeholder="Wpisz treść wiadomości..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Dodawanie..." : "Dodaj"}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}