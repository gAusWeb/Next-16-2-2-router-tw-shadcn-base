"use client";

import * as React from "react";
import { Phone, Mail } from "lucide-react";

interface ContactInfoProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  layout?: "horizontal" | "vertical";
  showEmail?: boolean;
  showPhone?: boolean;
}

export default function ContactInfo({
  className = "",
  textClassName = "",
  iconClassName = "",
  layout = "horizontal",
  showEmail = true,
  showPhone = true,
}: ContactInfoProps) {
  const [email, setEmail] = React.useState<string | null>(null);
  const [phone, setPhone] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Split across array fragments — static crawlers never see the assembled value
    const emailParts = ["info", "@", "mfdcreativestaging", ".", "com", ".au"];
    const phoneParts = [
      "+61",
      "\u00a0",
      "4",
      "00",
      "\u00a0",
      "000",
      "\u00a0",
      "000",
    ];
    if (showEmail) setEmail(emailParts.join(""));
    if (showPhone) setPhone(phoneParts.join(""));
  }, [showEmail, showPhone]);

  const containerClass =
    layout === "horizontal"
      ? `flex items-center gap-4 ${className}`
      : `flex flex-col gap-2 ${className}`;

  return (
    <div className={containerClass}>
      {showPhone && phone && (
        <a
          href={`tel:${phone.replace(/\s|\u00a0/g, "")}`}
          className={`flex items-center gap-1.5 hover:opacity-70 transition-opacity ${textClassName}`}
          aria-label={`Call us at ${phone}`}
        >
          <Phone className={`w-3.5 h-3.5 shrink-0 ${iconClassName}`} />
          <span className="text-xs font-medium">{phone}</span>
        </a>
      )}
      {showEmail && email && (
        <a
          href={`mailto:${email}`}
          className={`flex items-center gap-1.5 hover:opacity-70 transition-opacity ${textClassName}`}
          aria-label={`Email us at ${email}`}
        >
          <Mail className={`w-3.5 h-3.5 shrink-0 ${iconClassName}`} />
          <span className="text-xs font-medium">{email}</span>
        </a>
      )}
    </div>
  );
}
