"use client";
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    console.log(session)
    const user = session?.user;
    console.log(user)
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    if (pathname?.startsWith('/dashboard')) return null;

    return (
        <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm px-6 flex justify-between items-center">

            {/* Logo */}
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl font-bold">
                    PeThuB
                </Link>
            </div>

            {/* Middle Nav Links */}
            <ul className="flex items-center gap-6 mr-6 text-sm font-medium">
                <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/pets" className="hover:text-primary transition-colors">
                        All Pets
                    </Link>
                </li>
            </ul>

            {/* Auth Section */}
            {isPending ? (
                <div className="flex items-center gap-3">
                    <span className="loading loading-spinner loading-sm"></span>
                </div>
            ) : user ? (
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium hidden sm:block">
                        {user.name}
                    </span>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <Image
                                    alt={user.name ?? 'User avatar'}
                                    src={user.image ?? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                    referrerPolicy="no-referrer"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-200"
                        >
                            <li className="menu-title px-3 py-1 text-xs opacity-60">
                                {user.email}
                            </li>
                            <div className="divider my-0" />
                            <li>
                                <Link href="/profile" className="justify-between">
                                    Profile
                                    <span className="badge badge-sm badge-ghost">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/dasboard-Section">
                                    Dashboard
                                </Link>
                            </li>
                            <div className="divider my-0" />
                            <li>
                                <button onClick={handleSignOut} className="text-error">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Link href="/login" className="btn btn-ghost btn-sm">
                        Log In
                    </Link>
                    <Link href="/signup" className="btn btn-primary btn-sm">
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
}