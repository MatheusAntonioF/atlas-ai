import Link from "next/link";
import { Earth as EarthIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 lg:h-[80px] items-center gap-4 border-b px-6">
      <Link className="flex items-center gap-2 font-semibold" href="#">
        <EarthIcon className="h-6 w-6" />
        <span className="">Atlas AI</span>
      </Link>
    </header>
  );
}
