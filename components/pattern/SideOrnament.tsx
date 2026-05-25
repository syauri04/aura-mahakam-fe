import Image from "next/image";

interface SideOrnamentProps {
  side: "left" | "right";
  top?: string;
  size?: "small" | "large";
}

export default function SideOrnament({
  side,
  top = "50%",
  size = "large",
}: SideOrnamentProps) {
  const isRight = side === "right";
  const imageSrc =
    size === "small"
      ? isRight
        ? "/assets/small-ornament-side-right.png"
        : "/assets/small-ornament-side-left.png"
      : isRight
        ? "/assets/ornament-side-right.png"
        : "/assets/ornament-side-left.png";
  return (
    <div
      style={{ top }}
      className={[
        "absolute -translate-y-1/2 pointer-events-none",
        isRight ? "right-0" : "left-0",
      ].join(" ")}
    >
      <Image
        src={imageSrc}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-auto h-auto"
      />
    </div>
  );
}
