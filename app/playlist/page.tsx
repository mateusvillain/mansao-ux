import { EmptyState, PageShell } from "@/components/ui";

/** Placeholder: a tela real é entregue na Epic #5. */
export default function Page() {
  return (
    <PageShell title="Playlist" description="A trilha sonora">
      <EmptyState
        title="Ainda não construído"
        description="Esta seção chega na Epic #5. A navegação e a identidade já estão prontas para ela."
      />
    </PageShell>
  );
}
