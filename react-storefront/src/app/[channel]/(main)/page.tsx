import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata = {
  title: "GTech Laptops | Premium Laptops for Work, School & Business",
  description:
    "Discover premium laptops from Dell, HP, Lenovo, Apple and Toshiba. Reliable performance, real warranty and fast delivery from GTech Laptops.",
};

const brandLogos = [
  { name: "Dell", src: "/brands/dell.jpg" },
  { name: "HP", src: "/brands/hp.jpg" },
  { name: "Lenovo", src: "/brands/lenovo.jpg" },
  { name: "Apple", src: "/brands/apple.jpg" },
  { name: "Toshiba", src: "/brands/toshiba.jpg" },
];

export default function Page() {
  return (
    <div className="bg-rose-50 text-slate-900">
      {/* HERO + FLASH SALE */}
      <section className="relative overflow-hidden border-b border-rose-100 bg-gradient-to-br from-rose-50 via-rose-100 to-fuchsia-100">
        {/* soft glow blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-8 sm:pt-16 lg:flex-row lg:items-center">
          {/* left side text */}
          <div className="z-10 max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-white/70 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm shadow-rose-200">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified laptops • Real warranty • Fast delivery</span>
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Premium laptops for{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                work, school & business
              </span>
              .
            </h1>

            <p className="max-w-lg text-sm text-slate-700 sm:text-base">
              Shop carefully selected laptops from Dell, HP, Lenovo, Apple and Toshiba.
              Optimized for performance, battery life and reliability — ready to plug
              into your workflow from day one.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <LinkWithChannel
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-rose-300 transition hover:bg-rose-500"
              >
                Browse all laptops
              </LinkWithChannel>

              <LinkWithChannel
                href="/categories/laptops"
                className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white/60 px-5 py-2 text-sm font-medium text-rose-700 hover:border-rose-300 hover:bg-white"
              >
                View laptop deals
              </LinkWithChannel>
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-700">
              <li>• Genuine brands only</li>
              <li>• Tested and verified devices</li>
              <li>• Flexible specs: RAM, SSD, HDD</li>
              <li>• Support for individuals & businesses</li>
            </ul>
          </div>

          {/* right side flash sale card */}
          <div className="z-10 w-full max-w-sm lg:ml-auto">
            <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white/80 p-5 shadow-xl shadow-rose-200/60">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-rose-400" />
                <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                  Flash sale
                </span>
                <span>Limited-time laptop offers</span>
              </div>

              <p className="text-sm text-slate-800">
                Enjoy special pricing on selected laptops. Ideal for students resuming
                school, remote workers and business owners upgrading their devices.
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-700">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Starting from
                  </p>
                  <p className="text-lg font-semibold text-rose-600">
                    Budget-friendly options
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Offer status
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">Active now</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <LinkWithChannel
                  href="/products"
                  className="text-xs font-medium text-rose-600 underline-offset-4 hover:underline"
                >
                  Shop flash deals
                </LinkWithChannel>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] text-slate-700">
                  New arrivals added weekly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* thin info bar */}
        <div className="border-t border-rose-100 bg-white/60">
          <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 py-2 text-[11px] text-slate-700 sm:px-8">
            <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-700">
              Updates
            </span>
            <p className="whitespace-nowrap">
              Free basic support on every purchase • Warranty available on most models •
              Bulk orders available for businesses
            </p>
          </div>
        </div>
      </section>

      {/* BRAND LOGOS STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Trusted brands we work with
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-3 shadow-sm"
            >
              <Image
                src={brand.src}
                alt={`${brand.name} logo`}
                width={90}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA + WHY CHOOSE US to help fill page nicely */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          {/* CTA card */}
          <div className="rounded-2xl border border-rose-100 bg-white/80 px-6 py-8 shadow-sm sm:px-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Ready to explore all available laptops?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Browse the full catalogue, compare specs and choose the device that fits your
              work, school or business needs.
            </p>
            <div className="mt-5">
              <LinkWithChannel
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-rose-300 transition hover:bg-rose-500"
              >
                View all laptops
              </LinkWithChannel>
            </div>
          </div>

          {/* why choose us */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-rose-100 bg-white/80 p-4 text-sm shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                Genuine devices
              </p>
              <p className="mt-1 text-slate-700">
                Only trusted brands and verified laptops with clear specs and honest
                descriptions.
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-white/80 p-4 text-sm shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                Warranty & support
              </p>
              <p className="mt-1 text-slate-700">
                Warranty options available on most models plus basic after-sales support.
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-white/80 p-4 text-sm shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                Flexible range
              </p>
              <p className="mt-1 text-slate-700">
                From budget-friendly student systems to powerful business and creator
                laptops.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
