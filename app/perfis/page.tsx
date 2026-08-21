import { ProfileWall } from "@/components/profile/ProfileWall";
import { PageShell } from "@/components/ui";

export default function PerfisPage() {
  return (
    <PageShell title="👋 Perfis" description="Quem tá na casa — e o assunto de cada um">
      <ProfileWall />
    </PageShell>
  );
}
