import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-rose-100 bg-green/80 text-slate-900 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
          <Logo />
          <Nav channel={channel} />
        </div>
      </div>
    </header>
  );
}
