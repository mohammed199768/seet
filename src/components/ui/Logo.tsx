import Image from "next/image";

const files = {
  primary: { src: "/brand/logo-primary.webp", w: 900, h: 751 },
  reverse: { src: "/brand/logo-reverse.webp", w: 900, h: 759 },
  mono: { src: "/brand/logo-mono.webp", w: 900, h: 751 },
};

/**
 * The approved raster mark (never rebuilt in type). Width is in px; the brand minimum
 * for the full lockup is 140px, so smaller requests are clamped up.
 */
export function Logo({
  variant = "primary",
  width = 140,
  alt = "SEET Marketing Agency — صيت",
  preload = false,
  className,
}: {
  variant?: keyof typeof files;
  width?: number;
  alt?: string;
  preload?: boolean;
  className?: string;
}) {
  const f = files[variant];
  const w = Math.max(140, width);
  return (
    <Image
      src={f.src}
      width={w}
      height={Math.round((w * f.h) / f.w)}
      alt={alt}
      preload={preload}
      quality={90}
      sizes={`${w}px`}
      className={className}
      style={{ width: w, height: "auto" }}
      draggable={false}
    />
  );
}
