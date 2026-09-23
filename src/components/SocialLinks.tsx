import { SITE } from "@/config/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";

const NETWORKS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, ...SITE.social.instagram },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon, ...SITE.social.tiktok },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, ...SITE.social.facebook },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {NETWORKS.map(({ key, label, Icon, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE.name} en ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
