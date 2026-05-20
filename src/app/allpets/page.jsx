"use client";

import AllPetsCard from "@/components/AllPetsCard";
import { useEffect, useState } from "react";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Reptile", "Other"];

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (selectedSpecies.length) params.set("species", selectedSpecies.join(","));
        if (sort) params.set("sort", sort);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/pets${params.toString() ? `?${params}` : ""}`;
        // console.log("Fetching pets from:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
        setPets([]); // fallback to empty list
      } finally {
        setLoading(false);
      }
    };

   
    const timer = setTimeout(fetchPets, 300);
    return () => clearTimeout(timer);
  }, [search, selectedSpecies, sort]);

  const toggleSpecies = (sp) =>
    setSelectedSpecies((prev) =>
      prev.includes(sp) ? prev.filter((s) => s !== sp) : [...prev, sp]
    );

  const clearFilters = () => {
    setSearch("");
    setSelectedSpecies([]);
    setSort("");
  };

  const hasActiveFilters = search || selectedSpecies.length > 0 || sort;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">All Pets</h1>
        <p className="text-gray-500">Find your perfect companion</p>
      </div>

      {/* Filters */}
      <div className="bg-base-200 rounded-2xl p-4 mb-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by pet name…"
            className="input input-bordered flex-1 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered w-full sm:w-48 text-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort: Default</option>
            <option value="asc">Name: A → Z</option>
            <option value="desc">Name: Z → A</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {SPECIES_OPTIONS.map((sp) => (
            <button
              key={sp}
              onClick={() => toggleSpecies(sp)}
              className={`btn btn-sm rounded-full ${selectedSpecies.includes(sp) ? "btn-primary" : "btn-outline"
                }`}
            >
              {sp}
            </button>
          ))}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn btn-sm btn-ghost text-error ml-auto">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : pets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
          <span className="text-6xl">🐾</span>
          <p className="text-lg font-semibold">No pets match your filters</p>
          <button onClick={clearFilters} className="btn btn-sm btn-outline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {pets.map((pet) => (
            <AllPetsCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}