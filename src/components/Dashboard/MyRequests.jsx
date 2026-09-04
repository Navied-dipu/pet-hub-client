"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiEye,
  FiTrash2,
  FiCalendar,
  FiInfo,
  FiInbox,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function MyRequests({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const fetchMyRequests = async () => {
    if (!user?.email) return;
    
      const { data: tokenData } = await authClient.token()
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-adoptions/${user.email}`, {
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, [user]);

  const handleCancelRequest = async (id) => {
    
      const { data: tokenData } = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adopt/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to cancel request");

      toast.success("Adoption request cancelled successfully!");
      fetchMyRequests();
      setRequestToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel adoption request");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Title & Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-base-content">My Adoption Requests</h2>
        <p className="text-sm text-base-content/60 mt-1">
          Track and manage adoption requests you have sent to pet owners.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-300 shadow-md">
          <FiInbox className="text-5xl text-base-content/40 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-base-content">No requests made yet</h3>
          <p className="text-base-content/60 mt-1 max-w-sm mx-auto text-sm">
            You haven't applied to adopt any pets yet. Visit the "All Pets" list and find a companion to adopt.
          </p>
          <Link href="/allpets" className="btn btn-primary btn-sm mt-4 rounded-xl">
            Browse Pets
          </Link>
        </div>
      ) : (
        /* Requests Table/List */
        <div className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-left">
              {/* Head */}
              <thead className="bg-base-200 text-base-content/70 border-b border-base-300">
                <tr>
                  <th className="py-4 px-6 font-semibold">Pet Info</th>
                  <th className="py-4 px-6 font-semibold">Request Date</th>
                  <th className="py-4 px-6 font-semibold">Pickup Date</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              {/* Body */}
              <tbody className="divide-y divide-base-300">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-base-200/50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-base-200 border border-base-300">
                          <Image
                            src={request.petImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            alt={request.petName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-base-content block">{request.petName}</span>
                          <span className="text-xs text-base-content/50">
                            {request.species} · {request.breed}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-base-content/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-base-content/40" />
                        {request.submittedAt
                          ? new Date(request.submittedAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-base-content/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-accent" />
                        {request.pickupDate}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`badge font-bold border px-3 py-1.5 text-xs ${
                          request.status === "approved"
                            ? "badge-success text-white"
                            : request.status === "rejected"
                            ? "badge-error text-white"
                            : "badge-warning text-warning-content"
                        }`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Button */}
                        <Link
                          href={`/allpets/${request.petId}`}
                          className="btn btn-outline border-base-300 btn-xs rounded flex items-center gap-1"
                        >
                          <FiEye /> View Pet
                        </Link>
                        {/* Cancel Button */}
                        <button
                          onClick={() => setRequestToDelete(request)}
                          className="btn btn-error btn-xs text-white rounded flex items-center gap-1"
                        >
                          <FiTrash2 /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {requestToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-error">
              <FiAlertTriangle className="text-3xl" />
              <h3 className="text-xl font-bold text-base-content">Cancel Request</h3>
            </div>
            <p className="text-sm text-base-content/70">
              Are you sure you want to cancel and delete your adoption request for{" "}
              <strong className="text-base-content">"{requestToDelete.petName}"</strong>? This will remove
              your application.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRequestToDelete(null)}
                className="btn btn-outline border-base-300 rounded-lg btn-sm"
              >
                Go Back
              </button>
              <button
                onClick={() => handleCancelRequest(requestToDelete._id)}
                className="btn btn-error text-white rounded-lg btn-sm px-4"
              >
                Yes, Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
