import Link from "next/link";
import {  Earth as EarthIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <EarthIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <h1 className="font-semibold text-lg md:text-2xl">Home</h1>
    </header>
  );
}
