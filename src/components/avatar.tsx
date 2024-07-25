import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";
import React from "react";

type AvatarInterface = {
  seed: string;
  className?: string;
};

const Avatar: React.FC<AvatarInterface> = ({ seed, className }) => {
  const avatar = createAvatar(rings, {
    seed,
  });

  const svg = avatar.toString();

  // Convert SVG to base64 in a browser-compatible way
  const base64Svg = btoa(unescape(encodeURIComponent(svg)));
  const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

  return (
    <Image
      src={dataUrl}
      alt="User Avatar"
      width={100}
      height={100}
      className={className}
    />
  );
};

export default Avatar;
