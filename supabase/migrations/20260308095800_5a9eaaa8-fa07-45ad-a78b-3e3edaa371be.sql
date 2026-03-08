
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON public.videos;
DROP POLICY IF EXISTS "Videos are publicly readable" ON public.videos;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Videos are publicly readable" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update videos" ON public.videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete videos" ON public.videos FOR DELETE TO authenticated USING (true);
