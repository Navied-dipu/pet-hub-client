import AllPetsCard from "@/components/AllPetsCard";
import React from "react";

export default async function AllPetsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`);
  const pets = await res.json();

  // console.log(pets);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center font-extrabold">All Pets Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          pets.map(pet => <AllPetsCard key={pet._id} pet={pet}></AllPetsCard>)
        }
      </div>
    </div>
  );
}