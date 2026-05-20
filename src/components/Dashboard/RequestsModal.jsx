"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiX, FiCalendar, FiMail, FiUser, FiCheck, FiSlash, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function RequestsModal({ pet, isOpen, onClose, onRequestProcessed }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // stores request._id being processed

  const fetchRequests = async () => {
    if (!pet) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests/pet/${pet._id}`);
      if (!res.ok) throw new Error("Failed to load requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load adoption requests");
    } finally {
      setLoading(false);
    }
  };

  const isAnyRequestApproved = requests.some((r) => r.status === "approved") || pet.status === "Adopted";

  useEffect(() => {
    if (isOpen && pet) {
      fetchRequests();
    }
  }, [isOpen, pet]);

  const handleAction = async (requestId, status) => {
    if (!pet) return;
    setActionLoading(requestId);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adopt/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          petId: pet._id,
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      
      toast.success(`Request ${status} successfully!`);
      fetchRequests();
      if (onRequestProcessed) {
        onRequestProcessed();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request status");
    } finally {
      setActionLoading(null);
    }
  };

  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-base-200 transition text-gray-400 hover:text-white"
        >
          <FiX className="text-xl" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Adoption Requests
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Review requests to adopt <span className="text-primary font-semibold">{pet.petName}</span>
          </p>
          {isAnyRequestApproved && (
            <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2 text-success text-xs font-semibold">
              <FiCheckCircle className="text-sm shrink-0" />
              <span>An adoption request has already been approved. Further approvals are locked.</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <span className="loading loading-spinner loading-md text-primary"></span>
            <p className="text-sm text-gray-500">Fetching requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-base-300 rounded-xl bg-base-200/50">
            <FiAlertCircle className="mx-auto text-4xl text-gray-500 mb-2" />
            <p className="font-semibold text-white">No requests found</p>
            <p className="text-xs text-gray-500 mt-1">No one has requested to adopt this pet yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="p-5 border border-base-300 rounded-xl bg-base-200/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition hover:bg-base-200/70"
              >
                {/* Request Info */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white flex items-center gap-1">
                      <FiUser className="text-primary" /> {request.userName}
                    </span>
                    <span className="text-xs text-gray-500">|</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <FiMail /> {request.userEmail}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 flex items-center gap-1.5">
                    <FiCalendar className="text-accent" /> Pickup Date:{" "}
                    <span className="font-medium text-white">{request.pickupDate}</span>
                  </p>

                  {request.message && (
                    <div className="mt-2 text-xs text-gray-300 bg-base-300/40 p-3 rounded-lg border border-base-300">
                      <strong className="block mb-1 text-gray-400">Applicant Message:</strong>
                      <p className="italic">&quot;{request.message}&quot;</p>
                    </div>
                  )}
                </div>

                {/* Actions & Status */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-base-300">
                  {/* Status Badge */}
                  <span
                    className={`badge px-3 py-2 text-xs font-bold ${
                      request.status === "approved"
                        ? "badge-success text-white"
                        : request.status === "rejected"
                        ? "badge-error text-white"
                        : "badge-warning text-white"
                    }`}
                  >
                    {request.status.toUpperCase()}
                  </span>

                  {/* Action Buttons: only show if pending */}
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(request._id, "rejected")}
                        disabled={actionLoading !== null}
                        className="btn btn-error btn-xs text-white flex items-center gap-1"
                      >
                        <FiSlash /> Reject
                      </button>
                      <button
                        onClick={() => handleAction(request._id, "approved")}
                        disabled={actionLoading !== null || isAnyRequestApproved}
                        className="btn btn-success btn-xs text-white flex items-center gap-1"
                        title={isAnyRequestApproved ? "Another request is already approved" : ""}
                      >
                        <FiCheck /> Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t border-base-300">
          <button onClick={onClose} className="btn btn-outline border-base-300 text-white rounded-xl">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
