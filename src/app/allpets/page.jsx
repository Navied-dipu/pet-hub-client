"use client";

import AllPetsCard from "@/components/AllPetsCard";
import { useEffect, useState } from "react";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Reptile", "Other"];

export default function AllPetsPage() {
  const [pets, setPets]                       = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [search, setSearch]                   = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [sort, setSort]                       = useState("");

  // ── Fetch with debounce + abort on cleanup ───────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    const fetchPets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim())              params.set("search",  search.trim());
        if (selectedSpecies.length > 0) params.set("species", selectedSpecies.join(","));
        if (sort)                       params.set("sort",    sort);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/pets${params.toString() ? `?${params}` : ""}`;
        const res  = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setPets(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Failed to fetch pets:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPets, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, selectedSpecies, sort]);

  // ── Toggle a species chip ────────────────────────────────────────────────
  const toggleSpecies = (sp) => {
    setSelectedSpecies((prev) =>
      prev.includes(sp) ? prev.filter((s) => s !== sp) : [...prev, sp]
    );
  };

  // ── Clear all filters ────────────────────────────────────────────────────
  const clearFilters = () => {
    setSearch("");
    setSelectedSpecies([]);
    setSort("");
  };

  const hasActiveFilters = search || selectedSpecies.length > 0 || sort;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ── Page Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">All Pets</h1>
        <p className="text-gray-500">Find your perfect companion</p>
      </div>

      {/* ── Controls Bar ── */}
      <div className="bg-base-200 rounded-2xl p-4 mb-8 flex flex-col gap-4">

        {/* Row 1 – Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search input */}
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by pet name…"
              className="grow bg-transparent outline-none text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="opacity-50 hover:opacity-100 text-white">✕</button>
            )}
          </label>

          {/* Sort select */}
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

        {/* Row 2 – Species filter chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold opacity-60 mr-1 text-white">Species:</span>
          {SPECIES_OPTIONS.map((sp) => (
            <button
              key={sp}
              onClick={() => toggleSpecies(sp)}
              className={`btn btn-sm rounded-full transition-all ${
                selectedSpecies.includes(sp) ? "btn-primary text-white" : "btn-outline text-white"
              }`}
            >
              {sp}
            </button>
          ))}

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn btn-sm btn-ghost text-error ml-auto"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Results count ── */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          {pets.length === 0
            ? "No pets found"
            : `Showing ${pets.length} pet${pets.length !== 1 ? "s" : ""}`}
          {search && <span> matching <strong>&quot;{search}&quot;</strong></span>}
          {selectedSpecies.length > 0 && (
            <span> · filtered by <strong>{selectedSpecies.join(", ")}</strong></span>
          )}
        </p>
      )}

      {/* ── Grid ── */}
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