-- KNOWstalgia Phase 5: add the fun_fact column to questions.
--
-- This column already exists on the live database (added by hand in
-- the Supabase SQL Editor on 2026-10-19, ahead of the content pipeline
-- using it) — this migration just catches the repo's schema history up
-- to match what's actually live, so a fresh database created from
-- these migrations ends up the same shape. Safe to re-run.

alter table questions add column if not exists fun_fact text not null default '';

-- Drop the default once existing rows are backfilled — every row the
-- content pipeline has written already has a real fun_fact, so this is
-- just removing the placeholder now that it's done its job.
alter table questions alter column fun_fact drop default;
