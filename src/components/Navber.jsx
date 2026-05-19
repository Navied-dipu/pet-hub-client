"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Navber() {
    const pathname = usePathname();
    const isDashboard = pathname ? pathname.startsWith('/dashboard') : false;

    // Do not render the main website Navbar on dashboard pages
    if (isDashboard) {
        return null;
    }

    return (
        <div className="navbar sticky  bg-base-100 flex justify-between items-center shadow-sm px-6">
            <div className="flex-1 flex items-center gap-2">
                <a className="btn btn-ghost text-xl">PeThuB</a>
            </div>

            {/* Middle Links */}
            <div>
                <ul className="flex justify-between items-center mr-4 gap-6">
                    <li><Link href="/">Home</Link></li>
                    <li><a href="">All Pets</a></li>
                </ul>
            </div>

            <div className="flex-none flex gap-4 items-center">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile

                            </a>
                        </li>
                        <li><Link href={'/dashboard/dasboard-Section'}>Dashboard</Link></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}