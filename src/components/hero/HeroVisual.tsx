"use client";

import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center">
      <div
        className="
          relative
          h-[72svh]
          w-auto
          max-w-[90vw]
          md:h-[78svh]
          lg:h-[82svh]
        "
      >
        <Image
          src="/images/aab3.png"
          alt="Aavash Basnet"
          width={800}
          height={1000}
          priority
          className="h-full w-auto object-contain"
        />
      </div>
    </div>
  );
}