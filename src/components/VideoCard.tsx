import { useState } from "react";
import { Play } from "lucide-react";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  date: string;
  duration: string;
  category?: string;
  youtube_url?: string;
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  let videoId: string | null = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return url; // already embed
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.replace("/shorts/", "");
      } else {
        videoId = parsed.searchParams.get("v");
      }
    }
  } catch {
    return null;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
}

const VideoCard = ({ video }: { video: Video }) => {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(video.youtube_url);

  const handlePlay = () => {
    if (embedUrl) {
      setPlaying(true);
    } else if (video.youtube_url) {
      window.open(video.youtube_url, "_blank");
    }
  };

  return (
    <div className="group metallic-card rounded-lg overflow-hidden transition-all duration-300 hover:metallic-card-hover cursor-pointer">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video overflow-hidden" onClick={handlePlay}>
        {playing && embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute bottom-2 right-2 bg-background/90 text-foreground text-xs px-2 py-0.5 rounded font-medium">
              {video.duration}
            </span>
            <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-foreground/80 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <Play size={20} className="text-background ml-0.5" fill="currentColor" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-foreground font-medium text-sm line-clamp-2 mb-2 group-hover:text-metallic-shine transition-colors">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-xs mb-1">{video.channel}</p>
        <p className="text-muted-foreground text-xs">
          {video.views} • {video.date}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
