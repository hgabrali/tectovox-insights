
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'technology',
  content_type TEXT NOT NULL DEFAULT 'article',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  author TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  read_time TEXT NOT NULL DEFAULT '5 min',
  trending BOOLEAN NOT NULL DEFAULT false,
  source_url TEXT NOT NULL DEFAULT '',
  is_briefing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Public read access (no auth needed for a content site)
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read items"
  ON public.items FOR SELECT
  TO anon, authenticated
  USING (true);
