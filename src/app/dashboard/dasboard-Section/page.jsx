"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AddPetPage from "@/components/Dashboard/AddPetPage";
import MyListings from "@/components/Dashboard/MyListings";
import MyRequests from "@/components/Dashboard/MyRequests";
import Image from "next/image";
import {
  FiHome,
  FiPlusCircle,
  FiList,
  FiFileText,
  FiArrowLeft,
  FiUser,
  FiMail,
} from "react-icons/fi";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [content, setContent] = useState("Home");

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <div className="drawer lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page Content */}
        <div className="drawer-content flex flex-col p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {/* Header Bar for Mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <span className="text-xl font-bold text-white">PeThuB</span>
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-primary btn-sm drawer-button text-white"
            >
              Menu
            </label>
          </div>

          {/* Render active content tab */}
          <div className="flex-1 w-full">
            {content === "Home" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Welcome, {user.name}!</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage your pet listings, adoption requests, and account info.
                  </p>
                </div>

                <div className="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-xl flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                    <Image
                      src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-grow">
                    <h3 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                      <FiUser className="text-primary text-xl" /> {user.name}
                    </h3>
                    <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                      <FiMail className="text-accent" /> {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <button
                    onClick={() => setContent("ADD")}
                    className="p-6 rounded-2xl bg-base-100 hover:bg-base-200/50 border border-base-200 shadow-md text-left transition duration-200"
                  >
                    <FiPlusCircle className="text-primary text-3xl mb-3" />
                    <h4 className="font-bold text-white text-lg">List a New Pet</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Add a new shelter or listing for a pet looking for a home.
                    </p>
                  </button>

                  <button
                    onClick={() => setContent("MyListing")}
                    className="p-6 rounded-2xl bg-base-100 hover:bg-base-200/50 border border-base-200 shadow-md text-left transition duration-200"
                  >
                    <FiList className="text-accent text-3xl mb-3" />
                    <h4 className="font-bold text-white text-lg">My Listed Pets</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Check your listed pets and review user adoption requests.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {content === "ADD" && <AddPetPage />}

            {content === "MyListing" && <MyListings user={user} />}

            {content === "MyRequests" && <MyRequests user={user} />}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="drawer-side z-20">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-base-100 border-r border-base-200 min-h-full w-80 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Logo / Branding */}
              <div className="px-3">
                <Link href="/" className="text-2xl font-black text-white hover:opacity-90">
                  🐾 PeThuB
                </Link>
                <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">
                  Owner Dashboard
                </p>
              </div>

              <div className="divider my-0"></div>

              {/* Nav Links */}
              <ul className="menu menu-md p-0 space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setContent("Home");
                      document.getElementById("dashboard-drawer").checked = false;
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition ${
                      content === "Home" ? "bg-primary text-white" : "text-gray-400 hover:bg-base-200"
                    }`}
                  >
                    <FiHome className="text-lg" />
                    Home
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setContent("ADD");
                      document.getElementById("dashboard-drawer").checked = false;
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition ${
                      content === "ADD" ? "bg-primary text-white" : "text-gray-400 hover:bg-base-200"
                    }`}
                  >
                    <FiPlusCircle className="text-lg" />
                    Add Pet
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setContent("MyListing");
                      document.getElementById("dashboard-drawer").checked = false;
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition ${
                      content === "MyListing" ? "bg-primary text-white" : "text-gray-400 hover:bg-base-200"
                    }`}
                  >
                    <FiList className="text-lg" />
                    My Listings
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setContent("MyRequests");
                      document.getElementById("dashboard-drawer").checked = false;
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition ${
                      content === "MyRequests" ? "bg-primary text-white" : "text-gray-400 hover:bg-base-200"
                    }`}
                  >
                    <FiFileText className="text-lg" />
                    My Requests
                  </button>
                </li>
              </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="space-y-4 pt-4 border-t border-base-200">
              <Link
                href="/"
                className="btn btn-outline border-base-300 text-white w-full flex items-center justify-center gap-2 rounded-xl"
              >
                <FiArrowLeft /> Back to Main Site
              </Link>
              <div className="text-[10px] text-center text-gray-500 font-medium">
                &copy; {new Date().getFullYear()} PetHub. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;