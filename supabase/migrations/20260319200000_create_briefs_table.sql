CREATE TABLE briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  content_en text NOT NULL,
  content_tr text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read briefs" ON briefs
  FOR SELECT TO anon USING (true);
