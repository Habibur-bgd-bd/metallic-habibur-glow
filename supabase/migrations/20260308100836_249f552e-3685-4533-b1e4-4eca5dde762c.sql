
-- Drop all existing policies on videos
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON public.videos;
DROP POLICY IF EXISTS "Videos are publicly readable" ON public.videos;

-- Recreate as PERMISSIVE (default) policies allowing public access for now
CREATE POLICY "Videos are publicly readable" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Anyone can insert videos" ON public.videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update videos" ON public.videos FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete videos" ON public.videos FOR DELETE USING (true);
