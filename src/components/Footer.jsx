import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-base-200/50 pt-20 pb-10 border-t border-base-300 mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                🐾
                            </div>
                            <span className="text-2xl font-black tracking-tight text-base-content">
                                Pet<span className="text-primary">Hub</span>
                            </span>
                        </Link>
                        <p className="text-base-content/70 text-sm leading-relaxed mb-6">
                            Bringing joy to homes by connecting loving families with pets in need. Adopt a new best friend today!
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-base-content mb-4 tracking-wide uppercase text-sm">Explore</h3>
                        <ul className="flex flex-col gap-3 text-sm text-base-content/70">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/allpets" className="hover:text-primary transition-colors">All Pets</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-base-content mb-4 tracking-wide uppercase text-sm">Legal</h3>
                        <ul className="flex flex-col gap-3 text-sm text-base-content/70">
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Adoption Rules</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="font-bold text-base-content mb-4 tracking-wide uppercase text-sm">Connect With Us</h3>
                        <p className="text-base-content/70 text-sm mb-4">Follow us on social media for heartwarming adoption stories.</p>
                        <div className="flex gap-4">
                            {['Twitter', 'Instagram', 'Facebook'].map((social, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-all shadow-sm border border-base-300">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm"></div> {/* Placeholder icon shape */}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-base-300/60 text-xs text-base-content/50 font-medium">
                    <p>© {new Date().getFullYear()} PetHub Platform. All rights reserved.</p>
                    <p>Designed with ❤️ for pets.</p>
                </div>
            </div>
        </footer>
    )
}
