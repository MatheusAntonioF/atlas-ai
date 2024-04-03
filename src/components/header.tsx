import Link from 'next/link';
import { Earth as EarthIcon } from 'lucide-react';
import { currentUser } from '@clerk/nextjs';
import { UserProfile } from './user-profile';

export async function Header() {
    const loggedUser = await currentUser();
    return (
        <header className="flex h-14 lg:h-[80px] items-center justify-between gap-4 border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
                <EarthIcon className="h-6 w-6" />
                <span className="">Atlas AI</span>
            </Link>
            {loggedUser && <UserProfile />}
        </header>
    );
}
