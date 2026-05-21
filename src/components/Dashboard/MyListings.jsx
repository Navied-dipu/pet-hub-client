"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiMessageSquare,
  FiDollarSign,
  FiCheckCircle,
  FiHeart,
  FiInbox,
  FiAlertTriangle,
} from "react-icons/fi";
import UpdatePetModal from "./UpdatePetModal";
import RequestsModal from "./RequestsModal";

export default function MyListings({ user }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedPet, setSelectedPet] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  // Delete Confirmation State
  const [petToDelete, setPetToDelete] = useState(null);

  const fetchMyListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`);
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      // Filter pets belonging to this user
      const userListings = data.filter((pet) => pet.ownerEmail === user.email);
      setPets(userListings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, [user]);

  const handleDelete = async (id) => {
    
      const { data: tokenData } = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete pet");

      toast.success("Pet listing deleted successfully!");
      fetchMyListings();
      setPetToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete pet listing");
    }
  };

  // Stats calculation
  const totalListings = pets.length;
  const adoptedCount = pets.filter((pet) => pet.status === "Adopted").length;
  const availableCount = totalListings - adoptedCount;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-500 font-medium">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Title & Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white">My Listed Pets</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage and track all the pets you have put up for adoption.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block">Total Listings</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{totalListings}</span>
          </div>
          <div className="bg-primary/20 p-3 rounded-xl text-primary">
            <FiInbox className="text-2xl" />
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block">Available</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{availableCount}</span>
          </div>
          <div className="bg-info/20 p-3 rounded-xl text-info">
            <FiHeart className="text-2xl" />
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block">Adopted</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{adoptedCount}</span>
          </div>
          <div className="bg-success/20 p-3 rounded-xl text-success">
            <FiCheckCircle className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Listings Cards Grid */}
      {pets.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-300 shadow-md">
          <FiInbox className="text-5xl text-gray-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">No listings found</h3>
          <p className="text-gray-500 mt-1 max-w-sm mx-auto text-sm">
            You haven't listed any pets for adoption yet. Head to the "Add Pet" section to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-primary/50 transition-all duration-200"
            >
              {/* Pet Card Image & Status Badge */}
              <div className="relative h-48 w-full bg-neutral">
                <Image
                  src={pet.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt={pet.petName}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div
                  className={`absolute top-3 right-3 badge font-semibold border px-3 py-1 shadow-md ${
                    pet.status === "Adopted"
                      ? "badge-success text-white"
                      : "badge-primary text-white"
                  }`}
                >
                  {pet.status === "Adopted" ? "Adopted" : "Available"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{pet.petName}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 bg-base-200 px-2 py-1 rounded">
                      {pet.species} · {pet.breed}
                    </span>
                    <span className="text-sm font-semibold text-success flex items-center gap-0.5">
                      <FiDollarSign /> {pet.adoptionFee || 0}
                    </span>
                  </div>
                </div>

                {/* Dashboard Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-base-200">
                  {/* Requests Button */}
                  <button
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsRequestsOpen(true);
                    }}
                    className="btn btn-outline border-base-300 hover:bg-base-300 text-white btn-sm flex items-center justify-center gap-1.5 rounded-lg text-xs"
                  >
                    <FiMessageSquare /> Requests
                  </button>

                  {/* View Details Button */}
                  <Link
                    href={`/allpets/${pet._id}`}
                    className="btn btn-primary text-white btn-sm flex items-center justify-center gap-1.5 rounded-lg text-xs"
                  >
                    <FiEye /> View Details
                  </Link>

                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsUpdateOpen(true);
                    }}
                    className="btn btn-warning btn-sm text-black flex items-center justify-center gap-1.5 rounded-lg text-xs"
                  >
                    <FiEdit /> Edit Info
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setPetToDelete(pet)}
                    className="btn btn-error btn-sm text-white flex items-center justify-center gap-1.5 rounded-lg text-xs"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedPet && isUpdateOpen && (
        <UpdatePetModal
          pet={selectedPet}
          isOpen={isUpdateOpen}
          onClose={() => {
            setIsUpdateOpen(false);
            setSelectedPet(null);
          }}
          onUpdateSuccess={fetchMyListings}
        />
      )}

      {/* Requests Modal */}
      {selectedPet && isRequestsOpen && (
        <RequestsModal
          pet={selectedPet}
          isOpen={isRequestsOpen}
          onClose={() => {
            setIsRequestsOpen(false);
            setSelectedPet(null);
          }}
          onRequestProcessed={fetchMyListings}
        />
      )}

      {/* Custom Delete Confirmation Modal */}
      {petToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-error">
              <FiAlertTriangle className="text-3xl" />
              <h3 className="text-xl font-bold text-white">Delete Listing</h3>
            </div>
            <p className="text-sm text-gray-400">
              Are you sure you want to permanently delete the listing for{" "}
              <strong className="text-white">"{petToDelete.petName}"</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPetToDelete(null)}
                className="btn btn-outline border-base-300 text-white rounded-lg btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(petToDelete._id)}
                className="btn btn-error text-white rounded-lg btn-sm px-4"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
