-- Permite que um hóspede corrija o próprio nome (issue #12).
--
-- Sem isso, um nome digitado errado no primeiro acesso vira registro permanente
-- na lista de escolha dos próximos hóspedes: `guests` só tinha policies de
-- select e insert. Como o app não tem login, a policy é pública, igual às
-- demais — a autoria continua sendo convenção do cliente (ver docs/schema.md).

create policy "guests: edição pública" on public.guests
  for update using (true) with check (true);
