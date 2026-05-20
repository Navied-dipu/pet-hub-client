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
  const id = params?.id;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [pet, setPet] = useState(null);
  const [petLoading, setPetLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form states
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to view pet details and adopt.");
      router.push(`/login`);
    }
  }, [session, isPending, router]);

  // Fetch pet details
  useEffect(() => {
    if (!id) return;

    const fetchPetDetails = async () => {
      
      const token = await authClient.getToken()
      try {
        setPetLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load pet details");
        }
        const data = await res.json();
        setPet(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load pet details. Please try again.");
      } finally {
        setPetLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!session || !pet) return;

    if (user.email === pet.ownerEmail) {
      toast.error("Pet owners are not allowed to submit adoption requests.");
      return;
    }

    if (pet.status === "Adopted") {
      toast.error("This pet has already been adopted.");
      return;
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
      status: "pending", // default status
      submittedAt: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adopt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionRequest),
      });

      if (!res.ok) {
        throw new Error("Failed to submit adoption request");
      }

      const data = await res.json();

      if (data.insertedId) {
        toast.success(`Adoption request for ${pet.petName} submitted successfully!`);
        // Redirect to allpets page or list of listings
        router.push("/allpets");
      } else {
        toast.error("Failed to submit adoption request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during submission. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // If session is loading or user is not logged in, show full screen loader
  if (isPending || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse font-medium">Validating secure session...</p>
      </div>
    );
  }

  // If pet loading is in progress
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

  // If pet details not found
  if (!pet) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Pet Details Not Found</h2>
          <p className="text-gray-500">
            We couldnt retrieve information for this pet. It may have been adopted or the page link might be outdated.
          </p>
          <Link href="/allpets" className="btn btn-primary btn-md rounded-xl">
            <FiArrowLeft /> Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
      {/* Navigation & Header */}
      <div className="mb-6">
        <Link
          href="/allpets"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-all font-semibold"
        >
          <FiArrowLeft className="text-lg" /> Back to All Pets
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Pet Info & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Pet Details Card */}
          <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-200">
            {/* Image Banner */}
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

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Pet Title */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-white flex items-center gap-2">
                    {pet.petName}
                    <FiHeart className="text-red-500 fill-red-500 text-2xl animate-pulse" />
                  </h1>
                  <p className="text-gray-400 text-lg mt-1 font-medium">{pet.breed}</p>
                </div>
                {pet.adoptionFee && (
                  <div className="bg-success/20 text-success border border-success/30 px-5 py-3 rounded-2xl flex items-center gap-2 self-start sm:self-center">
                    <FiDollarSign className="text-xl font-bold" />
                    <div>
                      <span className="text-xs uppercase block font-semibold text-success/70">Adoption Fee</span>
                      <span className="text-xl font-bold">${pet.adoptionFee}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="divider my-2"></div>

              {/* Grid of Key Info Badge Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiSmile className="text-2xl text-warning" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Age</span>
                    <span className="font-bold text-sm sm:text-base text-white">{pet.age} Years</span>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiInfo className="text-2xl text-accent" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Gender</span>
                    <span className="font-bold text-sm sm:text-base text-white">{pet.gender}</span>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiCheckCircle className="text-2xl text-success" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Health</span>
                    <span className="font-bold text-sm sm:text-base text-white">{pet.healthStatus}</span>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300">
                  <FiCheckCircle className="text-2xl text-info" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Vaccination</span>
                    <span className="font-bold text-sm sm:text-base text-white">{pet.vaccinationStatus}</span>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3 border border-base-300 col-span-2 sm:col-span-2">
                  <FiMapPin className="text-2xl text-error" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Location</span>
                    <span className="font-bold text-sm sm:text-base text-white">{pet.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">About {pet.petName}</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                  {pet.description || "No additional description was provided for this pet. Please inquire for details."}
                </p>
              </div>

              {/* Listing Details */}
              <div className="pt-4 border-t border-base-300 text-xs text-gray-500 flex flex-wrap gap-x-6 gap-y-2">
                <span>Listed by: {pet.ownerEmail || "N/A"}</span>
                {pet.createdAt && (
                  <span>Posted: {new Date(pet.createdAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Adoption Form */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
            {pet.status === "Adopted" ? (
              <div className="p-8 text-center space-y-4 bg-success/10 border border-success/20">
                <FiCheckCircle className="text-6xl text-success mx-auto animate-bounce" />
                <h2 className="text-2xl font-extrabold text-white">Already Adopted!</h2>
                <p className="text-gray-400 text-sm">
                  This pet has found their forever home and is no longer available for adoption requests.
                </p>
                <Link href="/allpets" className="btn btn-success btn-sm text-white w-full rounded-xl mt-2">
                  Find Other Pets
                </Link>
              </div>
            ) : user.email === pet.ownerEmail ? (
              <div className="p-8 text-center space-y-4 bg-warning/10 border border-warning/20">
                <FiAlertCircle className="text-6xl text-warning mx-auto" />
                <h2 className="text-2xl font-extrabold text-white">Owner Control</h2>
                <p className="text-gray-400 text-sm">
                  As the owner of this pet listing, you cannot submit adoption requests for your own pet.
                </p>
                <Link href="/dashboard/dasboard-Section" className="btn btn-warning btn-sm text-black w-full rounded-xl mt-2">
                  Manage Listings
                </Link>
              </div>
            ) : (
              <>
                {/* Header decoration */}
                <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white text-center">
                  <h2 className="text-2xl font-extrabold flex justify-center items-center gap-2">
                    Adopt {pet.petName} <FiHeart className="fill-white animate-pulse" />
                  </h2>
                  <p className="text-xs text-white/95 mt-1">Submit adoption request to start process</p>
                </div>

                {/* Adoption Form Content */}
                <form onSubmit={handleAdoptSubmit} className="p-6 space-y-4">
                  {/* Pet Name - Read Only */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-gray-400 flex items-center gap-1.5">
                        Pet Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={pet.petName}
                      disabled
                      className="input input-bordered input-disabled w-full bg-base-200 border-base-300 cursor-not-allowed font-semibold text-gray-500"
                    />
                  </div>

                  {/* User Name - Read Only */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-gray-400 flex items-center gap-1.5">
                        <FiUser /> User Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="input input-bordered input-disabled w-full bg-base-200 border-base-300 cursor-not-allowed font-semibold text-gray-500"
                    />
                  </div>

                  {/* User Email - Read Only */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-gray-400 flex items-center gap-1.5">
                        <FiMail /> User Email
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input input-bordered input-disabled w-full bg-base-200 border-base-300 cursor-not-allowed font-semibold text-gray-500"
                    />
                  </div>

                  {/* Pickup Date - Input */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-white flex items-center gap-1.5">
                        <FiCalendar className="text-primary" /> Pickup Date <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="input input-bordered w-full focus:input-primary text-white border-base-300"
                    />
                  </div>

                  {/* Message - Textarea */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-white flex items-center gap-1.5">
                        Message <span className="text-error">*</span>
                      </span>
                    </label>
                    <textarea
                      required
                      placeholder="Share details about your living space, pet experience, or reasons for wanting to adopt..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="textarea textarea-bordered h-28 focus:textarea-primary text-white border-base-300 text-sm leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="btn btn-primary w-full text-white font-bold rounded-xl transition duration-200 hover:scale-[1.01] active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      {submitLoading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span> Submitting...
                        </>
                      ) : (
                        <>
                          Adopt {pet.petName}
                        </>
                      )}
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