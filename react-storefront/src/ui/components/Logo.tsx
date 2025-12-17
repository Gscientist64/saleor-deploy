"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "GTech Laptops";

const LogoInner = () => (
  <span className="flex items-center gap-1 text-lg font-semibold tracking-tight">
    <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
      GTech
    </span>
    <span className="text-slate-900">Laptops</span>
  </span>
);

export const Logo = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <h1 className="flex items-center" aria-label={companyName}>
        <LogoInner />
      </h1>
    );
  }

  return (
    <div className="flex items-center">
      <LinkWithChannel aria-label={companyName} href="/">
        <LogoInner />
      </LinkWithChannel>
    </div>
  );
};
