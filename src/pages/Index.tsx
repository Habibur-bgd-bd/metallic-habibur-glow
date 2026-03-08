import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import SocialLinks from "@/components/SocialLinks";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import VideoCard from "@/components/VideoCard";
import { sampleVideos } from "@/data/sampleVideos";
import ContactForm from "@/components/ContactForm";
import AboutMe from "@/components/AboutMe";
import SubscribeSection from "@/components/SubscribeSection";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: dbVideos } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Use DB videos if available, fallback to sample data
  const videos = dbVideos && dbVideos.length > 0
    ? dbVideos.map((v) => ({
        id: v.id,
        title: v.title,
        thumbnail: v.thumbnail,
        channel: v.channel,
        views: v.views,
        date: v.date,
        duration: v.duration,
        category: v.category || "Full Videos",
      }))
    : sampleVideos;

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    setReady(true);
  }, []);

  const filteredVideos = videos.filter((v) => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || v.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}

      {ready && (
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="sticky top-0 z-40 metallic-sheen border-b border-border/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="font-brand text-3xl text-gradient-social cursor-pointer">
                Habibur.bgd
              </h1>
              <SocialLinks />
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {/* Search & Filters */}
            <motion.div
              className="flex flex-col gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <CategoryFilter active={category} onChange={setCategory} />
            </motion.div>

            {/* Video Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </motion.div>

            {filteredVideos.length === 0 && (
              <p className="text-center text-muted-foreground py-20 text-lg">
                No videos found.
              </p>
            )}
            {/* About Section */}
            <AboutMe />
            {/* Contact Section */}
            <ContactForm />
          </main>

          {/* Footer */}
          <footer className="border-t border-border/50 mt-16">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-brand text-xl text-gradient-social">Habibur.bgd</span>
                <span className="text-muted-foreground text-sm">© 2026 All rights reserved</span>
              </div>
              <SocialLinks />
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default Index;
