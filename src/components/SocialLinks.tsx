import { Facebook, Instagram, Youtube } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "#", color: "text-social-fb", isCustom: false },
  { icon: Instagram, href: "#", color: "text-social-ig", isCustom: false },
  { icon: XIcon, href: "#", color: "text-metallic-shine", isCustom: true },
  { icon: Youtube, href: "#", color: "text-social-yt", isCustom: false },
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
