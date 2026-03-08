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
}

const VideoCard = ({ video }: { video: Video }) => (
  <div className="group metallic-card rounded-lg overflow-hidden transition-all duration-300 hover:metallic-card-hover cursor-pointer">
    {/* Thumbnail */}
    <div className="relative aspect-video overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Duration badge */}
      <span className="absolute bottom-2 right-2 bg-background/90 text-foreground text-xs px-2 py-0.5 rounded font-medium">
        {video.duration}
      </span>
      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/30 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-foreground/80 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
          <Play size={20} className="text-background ml-0.5" fill="currentColor" />
        </div>
      </div>
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

export default VideoCard;
