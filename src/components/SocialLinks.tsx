import Link from "next/link";
import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiFacebookBoxLine,
} from "react-icons/ri";

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  colorClassName?: string;
}

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mfdcreativestaging",
    Icon: RiInstagramLine,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mfdcreativestaging",
    Icon: RiLinkedinBoxLine,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mfdcreativestaging",
    Icon: RiFacebookBoxLine,
  },
];

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  colorClassName?: string;
}

export default function SocialLinks({
  className = "",
  iconSize = "w-[18px] h-[18px]",
  colorClassName = "",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow MFD Creative Staging on ${label}`}
          className={`hover:opacity-60 transition-opacity ${colorClassName}`}
        >
          <Icon className={iconSize} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
