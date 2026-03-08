import { Facebook, Instagram, Youtube } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/habibur.bgd.bd", color: "text-social-fb", isCustom: false },
  { icon: Instagram, href: "https://www.instagram.com/habibur.bgd.bd/", color: "text-social-ig", isCustom: false },
  { icon: Youtube, href: "https://www.youtube.com/@Habibur_bgd", color: "text-social-yt", isCustom: false },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@habibur.bgd.bd", color: "text-social-tiktok", isCustom: true },
  { icon: XIcon, href: "https://x.com/Habibur_bgd2030", color: "text-metallic-shine", isCustom: true },
];

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {socials.map(({ icon: Icon, href, color, isCustom }) => (
      <a
        key={href + color}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 p-2 rounded-lg hover:bg-accent hover:scale-110`}
      >
        {isCustom ? <Icon /> : <Icon size={20} />}
      </a>
    ))}
  </div>
);

export default SocialLinks;
