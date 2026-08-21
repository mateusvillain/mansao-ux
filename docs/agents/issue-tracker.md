# Issue tracker

O rastreador deste projeto é o **GitHub Issues** em `mateusvillain/mansao-ux`, acessado
pelo `gh` CLI (já autenticado nesta máquina).

## Como buscar uma issue referenciada num commit

Os commits referenciam issues no formato `Refs #N` (nunca `Closes`, para não fechar por
engano a partir de mensagem de commit).

```bash
gh issue view <N> --repo mateusvillain/mansao-ux --json number,title,body,state,milestone
```

## Estrutura do plano

| Conceito | Onde vive |
| --- | --- |
| PRD (fonte da verdade) | Wiki: https://github.com/mateusvillain/mansao-ux/wiki/Mansao-UX |
| Feature / release | Milestone `Mansão UX — v1` |
| Epic | Issue com label `epic` (#1 a #5) |
| Issue | Issue dentro do milestone, sub-issue de uma Epic |

Cada issue carrega **Objetivo**, **Contexto**, **Critérios de aceite**, **Tarefas**,
**Arquivos relevantes** e **Blocked by**. Os critérios de aceite são a spec verificável;
alguns têm anotações em itálico registrando o que ficou fora de escopo ou não pôde ser
verificado.

## Buscar o PRD

```bash
git clone https://github.com/mateusvillain/mansao-ux.wiki.git /tmp/mansao-wiki
cat /tmp/mansao-wiki/Mansao-UX.md
```

## Listar tudo do milestone

```bash
gh issue list --repo mateusvillain/mansao-ux --milestone "Mansão UX — v1" --state all --limit 50
```
