"use client";

import Link from "next/link";
import { useState } from "react";

const DashboardPage = () => {
    const [content, setContent] = useState("Home");

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col items-center justify-center min-h-screen p-10">
                    <label
                        htmlFor="my-drawer-3"
                        className="btn drawer-button lg:hidden mb-5"
                    >
                        Open drawer
                    </label>

                    {content === "Home" && (
                        <div>
                            <h2 className="text-3xl font-bold">Home Content</h2>
                            <p>This is home page content.</p>
                        </div>
                    )}

                    {content === "Profile" && (
                        <div>
                            <h2 className="text-3xl font-bold">Profile Content</h2>
                            <p>This is profile page content.</p>
                        </div>
                    )}

                    {content === "Settings" && (
                        <div>
                            <h2 className="text-3xl font-bold">Settings Content</h2>
                            <p>This is settings page content.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-3"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
                        <li>
                            <button onClick={() => setContent("Home")}>
                                Home
                            </button>
                        </li>

                        <li>
                            <button onClick={() => setContent("Profile")}>
                                Profile
                            </button>
                        </li>

                        <li>
                            <button onClick={() => setContent("Settings")}>
                                Settings
                            </button>
                        </li>
                        <li><Link href={'/'}>Back to Home</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;