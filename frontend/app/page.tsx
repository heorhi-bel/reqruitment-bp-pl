import { MessagesTable } from "../src/components/MessagesTable";
import { AddMessageForm } from "../src/components/AddMessageForm";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Aplikacja Wiadomości</h1>
        <p className="text-muted-foreground text-sm mt-1">Zarządzaj swoimi wiadomościami</p>
      </div>
      <AddMessageForm />
      <MessagesTable />
    </main>
  );
}