import { PlaylistBoard } from "@/components/playlist/PlaylistBoard";
import { PageShell } from "@/components/ui";

export default function PlaylistPage() {
  return (
    <PageShell title="🎵 Playlist" description="A trilha sonora da casa, decidida no voto">
      <PlaylistBoard />
    </PageShell>
  );
}
