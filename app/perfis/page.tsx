import { EmptyState, PageShell } from "@/components/ui";

/** Placeholder: a tela real é entregue na Epic #3. */
export default function Page() {
  return (
    <PageShell title="Perfis" description="Quem tá na casa">
      <EmptyState
        title="Ainda não construído"
        description="Esta seção chega na Epic #3. A navegação e a identidade já estão prontas para ela."
      />
    </PageShell>
  );
}
