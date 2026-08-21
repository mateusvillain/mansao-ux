import { NoteBoard } from "@/components/notes/NoteBoard";
import { PageShell } from "@/components/ui";

export default function RecadosPage() {
  return (
    <PageShell title="📌 Recados" description="Post-its da casa — some quando não vale mais">
      <NoteBoard />
    </PageShell>
  );
}
