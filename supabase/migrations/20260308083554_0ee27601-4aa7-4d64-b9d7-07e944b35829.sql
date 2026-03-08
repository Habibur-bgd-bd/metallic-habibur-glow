-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  youtube_url TEXT,
  channel TEXT NOT NULL DEFAULT 'Habibur.bgd',
  views TEXT NOT NULL DEFAULT '0 views',
  date TEXT NOT NULL DEFAULT 'Just now',
  duration TEXT NOT NULL DEFAULT '0:00',
  category TEXT DEFAULT 'All',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Videos are publicly readable"
  ON public.videos FOR SELECT
  USING (true);

-- Authenticated users can manage videos
CREATE POLICY "Authenticated users can insert videos"
  ON public.videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON public.videos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos"
  ON public.videos FOR DELETE
  TO authenticated
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();