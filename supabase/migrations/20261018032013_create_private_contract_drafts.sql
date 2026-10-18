-- M2-B3-P2: borradores privados. Revisar antes de aplicar al proyecto compartido.
-- La transacción evita exponer la tabla antes de activar RLS y restringir grants.
begin;

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid()
    references auth.users (id) on delete restrict,
  status text not null default 'draft'
    constraint contracts_draft_only check (status = 'draft'),
  title varchar(120) not null
    constraint contracts_title_nonblank check (length(btrim(title)) > 0),
  description text not null
    constraint contracts_description_nonblank check (length(btrim(description)) > 0),
  terms text not null
    constraint contracts_terms_nonblank check (length(btrim(terms)) > 0),
  created_at timestamptz not null default now()
);

create index contracts_created_by_created_at_idx
  on public.contracts (created_by, created_at desc);

alter table public.contracts enable row level security;

-- Los permisos predeterminados de proyectos Supabase pueden ser amplios.
revoke all on table public.contracts from public, anon, authenticated;
grant select on table public.contracts to authenticated;
grant insert (title, description, terms) on table public.contracts to authenticated;
grant update (title, description, terms) on table public.contracts to authenticated;

create policy contracts_select_own_drafts
  on public.contracts for select to authenticated
  using ((select auth.uid()) is not null
    and created_by = (select auth.uid())
    and status = 'draft');

create policy contracts_insert_own_drafts
  on public.contracts for insert to authenticated
  with check ((select auth.uid()) is not null
    and created_by = (select auth.uid())
    and status = 'draft');

create policy contracts_update_own_drafts
  on public.contracts for update to authenticated
  using ((select auth.uid()) is not null
    and created_by = (select auth.uid())
    and status = 'draft')
  with check ((select auth.uid()) is not null
    and created_by = (select auth.uid())
    and status = 'draft');

-- DELETE: sin grant ni política. Id, propietario, estado y fecha: sin UPDATE.
commit;
