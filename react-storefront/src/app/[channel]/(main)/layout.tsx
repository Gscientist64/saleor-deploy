import { type ReactNode } from "react";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";

export const metadata = {
  title: "GTech Laptops",
  description:
    "Modern laptop marketplace for work, school and business. Shop premium laptops from Dell, HP, Lenovo, Apple and Toshiba.",
};

export default async function RootLayout(props: {
  children: ReactNode;
  params: Promise<{ channel: string }>;
}) {
  const channel = (await props.params).channel;

  return (
    <>
      <Header channel={channel} />
      <div className="flex min-h-[calc(100dvh-64px)] flex-col bg-rose-100 text-slate-900">
        <main className="flex-1">{props.children}</main>
        <Footer channel={channel} />
      </div>
    </>
  );
}
