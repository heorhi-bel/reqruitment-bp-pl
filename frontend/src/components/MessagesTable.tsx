"use client";

import { useState } from "react";
import { useGetMessagesQuery } from "@/store/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditMessageDialog } from "./EditMessageDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import type { Message } from "@/store/api";

export function MessagesTable() {
  const { data: messages, isLoading, isError } = useGetMessagesQuery();
  const [editMessage, setEditMessage] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (isLoading) return <p className="text-muted-foreground text-sm">Ładowanie wiadomości...</p>;
  if (isError) return <p className="text-destructive text-sm">Błąd podczas ładowania wiadomości.</p>;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Wiadomość</TableHead>
              <TableHead className="w-1 text-right"><Ellipsis className="ml-8 h-4 w-4"/></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Brak wiadomości.
                </TableCell>
              </TableRow>
            )}
            {messages?.map((msg, index) => (
              <TableRow key={msg.id}>
                <TableCell className="font-mono text-muted-foreground">{++index}</TableCell>
                <TableCell>{msg.message}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => setEditMessage(msg)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => setDeleteId(msg.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditMessageDialog message={editMessage} onClose={() => setEditMessage(null)} />
      <DeleteConfirmDialog messageId={deleteId} onClose={() => setDeleteId(null)} />
    </>
  );
}