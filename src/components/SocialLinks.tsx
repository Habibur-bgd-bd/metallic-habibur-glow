import { Facebook, Instagram, Youtube } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://facebook.com/Habibur.bgd", glow: "glow-fb", hoverColor: "hover:text-social-fb" },
  { icon: Instagram, href: "https://instagram.com/Habibur.bgd", glow: "glow-ig", hoverColor: "hover:text-social-ig" },
  { icon: XIcon, href: "https://x.com/Habibur.bgd", glow: "glow-x", hoverColor: "hover:text-metallic-shine", isCustom: true },
  { icon: Youtube, href: "https://youtube.com/@Habibur.bgd", glow: "glow-yt", hoverColor: "hover:text-social-yt" },
];

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {socials.map(({ icon: Icon, href, glow, hoverColor, isCustom }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-muted-foreground ${hoverColor} ${glow} transition-all duration-300 p-2 rounded-lg hover:bg-accent`}
      >
        {isCustom ? <Icon /> : <Icon size={20} />}
      </a>
    ))}
  </div>
);

export default SocialLinks;
