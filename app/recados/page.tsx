import { EmptyState, PageShell } from "@/components/ui";

/** Placeholder: a tela real é entregue na Epic #4. */
export default function Page() {
  return (
    <PageShell title="Recados" description="Post-its da casa">
      <EmptyState
        title="Ainda não construído"
        description="Esta seção chega na Epic #4. A navegação e a identidade já estão prontas para ela."
      />
    </PageShell>
  );
}
