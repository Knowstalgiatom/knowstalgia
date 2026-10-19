-- KNOWstalgia Phase 5: content backend schema
-- Run once in the Supabase SQL Editor for this project.
-- Safe to re-run: seed inserts use ON CONFLICT DO NOTHING.

create table if not exists decades (
  id text primary key,
  label text not null,
  name text not null,
  sort_order int not null
);

create table if not exists categories (
  id text primary key,
  label text not null,
  blurb text not null,
  sort_order int not null
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  decade_id text not null references decades(id),
  title text not null,
  sort_order int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  category_id text not null references categories(id),
  sort_order int not null,
  text text not null,
  options jsonb not null,
  correct_index smallint not null check (correct_index between 0 and 3),
  created_at timestamptz not null default now(),
  unique (quiz_id, sort_order)
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  decade_id text references decades(id),
  category_id text references categories(id),
  question_text text not null,
  options jsonb not null,
  correct_index smallint not null check (correct_index between 0 and 3),
  submitted_by_email text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- Seed: the seven decades (brief §6; theme colours stay in code, not here)
insert into decades (id, label, name, sort_order) values
  ('60s', '60s', '1960s', 1),
  ('70s', '70s', '1970s', 2),
  ('80s', '80s', '1980s', 3),
  ('90s', '90s', '1990s', 4),
  ('00s', '00s', '2000s', 5),
  ('10s', '10s', '2010s', 6),
  ('20s', '20s', '2020s', 7)
on conflict (id) do nothing;

-- Seed: the seven canonical categories, fixed order (brief §9)
insert into categories (id, label, blurb, sort_order) values
  ('sport', 'Sport', 'Moments, kits, celebrations, commentary', 1),
  ('music', 'Music', 'Artists, songs, gigs, formats, fashion', 2),
  ('tv-film', 'TV & Film', 'Shows, characters, catchphrases, Saturday nights', 3),
  ('food-drink', 'Food & Drink', 'Sweets, snacks, adverts, discontinued favourites', 4),
  ('pop-culture', 'Pop Culture', 'Toys, trends, playground crazes, tech', 5),
  ('games-jokes-quotes-logos', 'Games, Jokes, Quotes & Logos', 'Finish-the-line, slogans, logos, playground games', 6),
  ('knowstalgia-trip', 'KNOWstalgia Trip', 'The signature final trip back', 7)
on conflict (id) do nothing;

-- Row Level Security: quiz content is publicly readable; nothing is
-- publicly writable. Anyone can submit a question, but only an admin
-- (using the service_role key, never exposed to the browser) can read
-- or moderate the submissions queue.
alter table decades enable row level security;
alter table categories enable row level security;
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table submissions enable row level security;

drop policy if exists "Public read decades" on decades;
create policy "Public read decades" on decades for select using (true);

drop policy if exists "Public read categories" on categories;
create policy "Public read categories" on categories for select using (true);

drop policy if exists "Public read quizzes" on quizzes;
create policy "Public read quizzes" on quizzes for select using (true);

drop policy if exists "Public read questions" on questions;
create policy "Public read questions" on questions for select using (true);

drop policy if exists "Public can submit questions" on submissions;
create policy "Public can submit questions" on submissions for insert with check (true);
