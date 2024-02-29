import { getInitials } from "@/utils/string";
import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  url?: string;
  name?: string;
};

export const UserAvatar = ({ size = 36, url, name, className }: Props) => {
  if (!url && !name) return null;

  let picture: React.ReactNode = null;

  if (!url && name) {
    const initials = getInitials(name);

    picture = (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-secondary text-center text-[10px] font-semibold text-secondary-foreground"
      >
        {initials}
      </div>
    );
  } else {
    picture = (
      <Image
        alt={name!}
        src={url!}
        className="rounded-full"
        width={200}
        height={200}
        style={{ width: size, height: size }}
      />
    );
  }

  return <div className={className}>{picture}</div>;
};
