"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCalendar,
  FiMail,
  FiUser,
  FiInfo,
  FiMapPin,
  FiHeart,
  FiCheckCircle,
  FiSmile,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";

const PetDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  
  // ফোল্ডারের নাম [id] বা [petId] যাই হোক, এটি কাজ করবে
  const petId = params?.id || params?.petId;

  // সেশন স্টেট
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  // ডেটা স্টেট
  const [pet, setPet] = useState(null);
  const [petLoading, setPetLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // ফর্ম স্টেট
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  // ১. ইউজার লগড-ইন না থাকলে রিডাইরেক্ট
  useEffect(() => {
    if (!sessionLoading && !session) {
      toast.error("Please log in to view pet details and adopt.");
      router.push("/login");
    }
  }, [session, sessionLoading, router]);

  // ২. Pet Details Fetch করা
  useEffect(() => {
    // petId বা session না থাকলে অযথাই কল করবে না
    // if (!petId || sessionLoading || !session) return;

    const fetchPetDetails = async () => {
      try {
        setPetLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${petId}`);
        
        if (!res.ok) throw new Error("Failed to load pet details");
        
        const data = await res.json();
        setPet(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load pet details.");
      } finally {
        setPetLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId, sessionLoading, session]);

  // ৩. ফর্ম সাবমিট হ্যান্ডলার
  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!session || !pet) return;

    if (user.email === pet.ownerEmail) {
      return toast.error("Pet owners cannot adopt their own pet.");
    }
    if (pet.status === "Adopted") {
      return toast.error("This pet has already been adopted.");
    }

    setSubmitLoading(true);
    const adoptionRequest = {
      petId: pet._id,
      petName: pet.petName,
      petImage: pet.image,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      userName: user.name,
      userEmail: user.email,
      pickupDate,
      message,
      status: "pending",
      submittedAt: new Date(),
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adopt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(adoptionRequest),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      const data = await res.json();
      if (data.insertedId) {
        toast.success(`Adoption request for ${pet.petName} submitted successfully!`);
        router.push("/allpets");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("An error occurred during submission.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // ---------------- UI RENDERING ----------------

  // সেশন চেক হচ্ছে
  if (sessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse font-medium">Validating secure session...</p>
      </div>
    );
  }

  // সেশন না থাকলে কিছুই দেখাবে না (রিডাইরেক্ট হবে)
  if (!session) return null;

  // Pet ডেটা ফেচ হচ্ছে
  if (petLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-gray-200 rounded-2xl w-full"></div>
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="h-[450px] bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Pet পাওয়া যায়নি
  if (!pet) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Pet Details Not Found</h2>
          <p className="text-gray-500">
            We couldn't retrieve information for this pet.
          </p>
          <Link href="/allpets" className="btn btn-primary btn-md rounded-xl">
            <FiArrowLeft /> Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  // মেইন পেইজ রেন্ডার
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
      <div className="mb-6">
        <Link
          href="/allpets"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-all font-semibold"
        >
          <FiArrowLeft className="text-lg" /> Back to All Pets
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-200">
            <div className="relative h-[450px] w-full bg-neutral">
              <Image
                src={pet.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt={pet.petName}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute top-4 right-4 bg-primary text-white font-bold px-4 py-2 rounded-full shadow-lg text-sm">
                {pet.species}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-white flex items-center gap-2">
                    {pet.petName}
                    <FiHeart className="text-red-500 fill-red-500 text-2xl animate-pulse" />
                  </h1>
                  <p className="text-gray-400 text-lg mt-1 font-medium">{pet.breed}</p>
                </div>
                {pet.adoptionFee && (
                  <div className="bg-success/20 text-success border border-success/30 px-5 py-3 rounded-2xl flex items-center gap-2">
                    <FiDollarSign className="text-xl font-bold" />
                    <div>
                      <span className="text-xs uppercase block font-semibold text-success/70">Fee</span>
                      <span className="text-xl font-bold">${pet.adoptionFee}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="divider my-2"></div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiSmile className="text-2xl text-warning" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Age</span>
                    <span className="font-bold text-white">{pet.age} Years</span>
                  </div>
                </div>
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiInfo className="text-2xl text-accent" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Gender</span>
                    <span className="font-bold text-white">{pet.gender}</span>
                  </div>
                </div>
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiCheckCircle className="text-2xl text-success" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Health</span>
                    <span className="font-bold text-white">{pet.healthStatus}</span>
                  </div>
                </div>
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiCheckCircle className="text-2xl text-info" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Vaccination</span>
                    <span className="font-bold text-white">{pet.vaccinationStatus}</span>
                  </div>
                </div>
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300 col-span-2 sm:col-span-2">
                  <FiMapPin className="text-2xl text-error" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Location</span>
                    <span className="font-bold text-white">{pet.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">About {pet.petName}</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {pet.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
            {pet.status === "Adopted" ? (
              <div className="p-8 text-center space-y-4 bg-success/10">
                <FiCheckCircle className="text-6xl text-success mx-auto animate-bounce" />
                <h2 className="text-2xl font-extrabold text-white">Already Adopted!</h2>
                <Link href="/allpets" className="btn btn-success btn-sm w-full rounded-xl mt-2">
                  Find Other Pets
                </Link>
              </div>
            ) : user.email === pet.ownerEmail ? (
              <div className="p-8 text-center space-y-4 bg-warning/10">
                <FiAlertCircle className="text-6xl text-warning mx-auto" />
                <h2 className="text-2xl font-extrabold text-white">Owner Control</h2>
                <p className="text-gray-400 text-sm">You cannot adopt your own pet.</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white text-center">
                  <h2 className="text-2xl font-extrabold flex justify-center items-center gap-2">
                    Adopt {pet.petName} <FiHeart className="fill-white animate-pulse" />
                  </h2>
                </div>

                <form onSubmit={handleAdoptSubmit} className="p-6 space-y-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-gray-400">Pet Name</span></label>
                    <input type="text" value={pet.petName} disabled className="input input-bordered w-full bg-base-200 font-semibold text-gray-500" />
                  </div>
                  
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-gray-400 flex items-center gap-1.5"><FiUser /> Name</span></label>
                    <input type="text" value={user.name} disabled className="input input-bordered w-full bg-base-200 font-semibold text-gray-500" />
                  </div>

                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-gray-400 flex items-center gap-1.5"><FiMail /> Email</span></label>
                    <input type="email" value={user.email} disabled className="input input-bordered w-full bg-base-200 font-semibold text-gray-500" />
                  </div>

                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-white flex items-center gap-1.5"><FiCalendar className="text-primary" /> Pickup Date *</span></label>
                    <input type="date" required min={new Date().toISOString().split("T")[0]} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="input input-bordered w-full focus:input-primary text-white" />
                  </div>

                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-bold text-white">Message *</span></label>
                    <textarea required placeholder="Share details..." value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered h-28 focus:textarea-primary text-white"></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={submitLoading} className="btn btn-primary w-full text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2">
                      {submitLoading ? <><span className="loading loading-spinner loading-sm"></span> Submitting...</> : `Adopt ${pet.petName}`}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;