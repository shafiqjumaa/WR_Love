-- ===== جدول الذكريات (Timeline) =====
create table memories (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  description text not null,
  video_url text,
  location text,
  linked_message text,
  created_at timestamptz default now()
);

-- صور كل ذكرى (نفس الصور تُستخدم تلقائيًا في معرض الصور)
create table memory_images (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid references memories(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamptz default now()
);

-- ===== جدول رسائل الحب =====
create table messages (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  date date not null,
  image_url text,
  is_secret boolean default false,
  scheduled_at timestamptz,
  created_at timestamptz default now()
);

-- ===== جدول المفاجآت =====
create table surprises (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text,
  image_url text,
  video_url text,
  question text,
  unlock_at timestamptz not null,
  created_at timestamptz default now()
);

-- ===== جرة رسائل الحب =====
create table jar_messages (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  created_at timestamptz default now()
);

-- ===== المناسبات المهمة (لعداد الحب) =====
create table occasions (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  date timestamptz not null,
  created_at timestamptz default now()
);

-- ===== أسئلة الألعاب (نعم/لا ، تحديات، مين بيعرف الثاني أكتر) =====
create table game_questions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('yes_no', 'challenge', 'know_you')),
  content text not null,
  created_at timestamptz default now()
);

-- ===== لعبة تخمين الرقم (Real-time بين شخصين) =====
create table number_games (
  id uuid primary key default gen_random_uuid(),
  player1_email text not null,
  player2_email text,
  player1_number int,
  player2_number int,
  status text not null default 'waiting' check (status in ('waiting', 'playing', 'finished')),
  turn text,
  history jsonb default '[]',
  winner text,
  created_at timestamptz default now()
);

-- ===== دفتر الخواطر الصغيرة =====
create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_email text,
  created_at timestamptz default now()
);

-- ===== إعداد الموقع المشترك (Theme الحالي) =====
create table site_settings (
  id int primary key default 1,
  theme text not null default 'rose',
  check (id = 1)
);
insert into site_settings (id, theme) values (1, 'rose');

-- ===== الحماية (RLS): فقط المستخدم المسجّل دخول يقدر يشوف أو يعدّل =====
alter table memories enable row level security;
alter table memory_images enable row level security;
alter table messages enable row level security;

create policy "authenticated can read memories" on memories
  for select using (auth.role() = 'authenticated');
create policy "authenticated can write memories" on memories
  for all using (auth.role() = 'authenticated');

create policy "authenticated can read memory_images" on memory_images
  for select using (auth.role() = 'authenticated');
create policy "authenticated can write memory_images" on memory_images
  for all using (auth.role() = 'authenticated');

create policy "authenticated can read messages" on messages
  for select using (auth.role() = 'authenticated');
create policy "authenticated can write messages" on messages
  for all using (auth.role() = 'authenticated');

alter table surprises enable row level security;
alter table jar_messages enable row level security;
alter table occasions enable row level security;
alter table game_questions enable row level security;
alter table number_games enable row level security;
alter table site_settings enable row level security;
alter table journal_entries enable row level security;
create policy "authenticated full access journal_entries" on journal_entries for all using (auth.role() = 'authenticated');

create policy "authenticated full access surprises" on surprises for all using (auth.role() = 'authenticated');
create policy "authenticated full access jar_messages" on jar_messages for all using (auth.role() = 'authenticated');
create policy "authenticated full access occasions" on occasions for all using (auth.role() = 'authenticated');
create policy "authenticated full access game_questions" on game_questions for all using (auth.role() = 'authenticated');
create policy "authenticated full access number_games" on number_games for all using (auth.role() = 'authenticated');
create policy "authenticated full access site_settings" on site_settings for all using (auth.role() = 'authenticated');

-- تفعيل Realtime على لعبة تخمين الرقم وإعدادات الموقع (Theme المشترك)
alter publication supabase_realtime add table number_games;
alter publication supabase_realtime add table site_settings;

-- ===== مخزن الصور =====
insert into storage.buckets (id, name, public) values ('our-photos', 'our-photos', true)
on conflict (id) do nothing;

create policy "anyone can view photos" on storage.objects
  for select using (bucket_id = 'our-photos');

create policy "authenticated can upload photos" on storage.objects
  for insert with check (bucket_id = 'our-photos' and auth.role() = 'authenticated');

create policy "authenticated can delete photos" on storage.objects
  for delete using (bucket_id = 'our-photos' and auth.role() = 'authenticated');
