import { Card } from "@/components/ui";
import type { ProfileWithGuest } from "@/lib/db/profiles";

/** Um perfil no mural. `action` recebe o botão de editar quando é o seu (#18). */
export function ProfileCard({
  profile,
  action,
}: {
  profile: ProfileWithGuest;
  action?: React.ReactNode;
}) {
  return (
    <Card
      header={
        <>
          <div>
            <h3 className="text-lg font-medium">{profile.guest.name}</h3>
            <p className="text-sm text-muted">{profile.role}</p>
          </div>
          {action}
        </>
      }
    >
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Fato curioso</dt>
          <dd className="mt-0.5">{profile.fun_fact}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Me chama pra falar sobre</dt>
          <dd className="mt-0.5">{profile.talk_to_me_about}</dd>
        </div>
      </dl>
    </Card>
  );
}
