"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddPetPage() {
  const router = useRouter();

  // Replace with your auth user
    const { data: session, isPending } = authClient.useSession();
     console.log(session)
     const user = session?.user;

  const [loading, setLoading] = useState(false);

  const handleAddPet = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const petData = {
      petName: form.petName.value,
      species: form.species.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      image: form.image.value,
      healthStatus: form.healthStatus.value,
      vaccinationStatus: form.vaccinationStatus.value,
      location: form.location.value,
      adoptionFee: form.adoptionFee.value,
      description: form.description.value,
      ownerEmail: user?.email,
      createdAt: new Date(),
    };


      const { data: tokenData } = await authClient.token()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-pet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(petData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Pet Added Successfully!");
        // router.push("/dashboard/my-listings");
      } else {
        toast.error("Failed to add pet");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[FBF5DD]">
      <div className=" rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Add New Pet
        </h2>

        <form
          onSubmit={handleAddPet}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Pet Name */}
          <div>
            <label className="block mb-2 font-semibold">
              Pet Name
            </label>
            <input
              type="text"
              name="petName"
              required
              placeholder="Enter pet name"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block mb-2 font-semibold">
              Species
            </label>
            <select
              name="species"
              required
              className="w-full border rounded-xl text-black px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
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
            <label className="block mb-2 font-semibold">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              required
              placeholder="Enter breed"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-semibold">
              Age
            </label>
            <input
              type="number"
              name="age"
              required
              placeholder="Pet age"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold">
              Gender
            </label>
            <select
              name="gender"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://..."
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="block mb-2 font-semibold">
              Health Status
            </label>
            <input
              type="text"
              name="healthStatus"
              required
              placeholder="Healthy / Injured"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="block mb-2 font-semibold">
              Vaccination Status
            </label>
            <input
              type="text"
              name="vaccinationStatus"
              required
              placeholder="Vaccinated / Not Vaccinated"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="Dhaka, Bangladesh"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="block mb-2 font-semibold">
              Adoption Fee
            </label>
            <input
              type="number"
              name="adoptionFee"
              required
              placeholder="100"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Owner Email */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Owner Email
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full border rounded-xl px-4 py-3  cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              required
              placeholder="Write pet details..."
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Adding..." : "Add Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}