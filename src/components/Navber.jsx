"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    if (pathname?.startsWith('/dashboard')) return null;

    return (
        <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-base-100/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex-1">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            🐾
                        </div>
                        <span className="text-xl font-black tracking-tight text-base-content">
                            Pet<span className="text-primary">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* Middle Nav Links */}
                <ul className="hidden md:flex items-center gap-8 mr-8 text-sm font-bold text-base-content/80">
                    <li>
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/allpets" className="hover:text-primary transition-colors">
                            All Pets
                        </Link>
                    </li>
                </ul>

                {/* Auth Section */}
                {isPending ? (
                    <div className="flex items-center gap-3 w-24 justify-end">
                        <span className="loading loading-spinner loading-sm text-primary"></span>
                    </div>
                ) : user ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold hidden sm:block text-base-content">
                            {user.name}
                        </span>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary/30 transition-all">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <Image
                                        alt={user.name ?? 'User avatar'}
                                        src={user?.image || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                        referrerPolicy="no-referrer"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-4 w-56 p-3 shadow-2xl border border-base-200 gap-1"
                            >
                                <li className="menu-title px-3 py-2 text-xs font-semibold opacity-60">
                                    {user.email}
                                </li>
                                <div className="divider my-1" />
                            
                                <li>
                                    <Link href="/dashboard/dasboard-Section" className="py-3 font-semibold rounded-xl">
                                        Dashboard
                                    </Link>
                                </li>
                                <div className="divider my-1" />
                                <li>
                                    <button onClick={handleSignOut} className="text-error py-3 font-semibold rounded-xl hover:bg-error/10">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="btn btn-ghost btn-sm font-bold rounded-xl hidden sm:flex">
                            Log In
                        </Link>
                        <Link href="/signup" className="btn btn-primary btn-sm rounded-xl font-bold shadow-md shadow-primary/20">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}