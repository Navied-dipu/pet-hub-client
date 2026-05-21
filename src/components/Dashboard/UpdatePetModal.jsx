"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

export default function UpdatePetModal({ pet, isOpen, onClose, onUpdateSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        petName: pet.petName || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        image: pet.image || "",
        healthStatus: pet.healthStatus || "",
        vaccinationStatus: pet.vaccinationStatus || "",
        location: pet.location || "",
        adoptionFee: pet.adoptionFee || "",
        description: pet.description || "",
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pet) return;

    setLoading(true);

      const { data: tokenData } = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          status: pet.status, // preserve status
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update pet details");
      }

      toast.success("Pet updated successfully!");
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update pet details");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-base-200 transition text-gray-400 hover:text-white"
        >
          <FiX className="text-xl" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">Update Pet Details</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pet Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Pet Name</label>
            <input
              type="text"
              name="petName"
              required
              value={formData.petName}
              onChange={handleChange}
              placeholder="Enter pet name"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Species</label>
            <select
              name="species"
              required
              value={formData.species}
              onChange={handleChange}
              className="w-full border border-base-300 rounded-xl text-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200"
            >
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Breed</label>
            <input
              type="text"
              name="breed"
              required
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter breed"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Age (Years)</label>
            <input
              type="number"
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="Pet age"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-base-300 rounded-xl text-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Image URL</label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Health Status</label>
            <input
              type="text"
              name="healthStatus"
              required
              value={formData.healthStatus}
              onChange={handleChange}
              placeholder="Healthy / Injured"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Vaccination Status</label>
            <input
              type="text"
              name="vaccinationStatus"
              required
              value={formData.vaccinationStatus}
              onChange={handleChange}
              placeholder="Vaccinated / Not Vaccinated"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Adoption Fee ($)</label>
            <input
              type="number"
              name="adoptionFee"
              required
              value={formData.adoptionFee}
              onChange={handleChange}
              placeholder="100"
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-300">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Write pet details..."
              className="w-full border border-base-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-base-200 text-white text-sm"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-base-300">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline border-base-300 text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-white rounded-xl px-8"
            >
              {loading ? "Saving..." : "Update Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
