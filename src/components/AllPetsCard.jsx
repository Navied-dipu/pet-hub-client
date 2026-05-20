import Image from "next/image";
import Link from "next/link";



export default function AllPetsCard({ pet }) {
  const {
    _id,
    petName,
    species,
    breed,
    age,
    gender,
    image,
    healthStatus,
    vaccinationStatus,
    location,
    description,
  } = pet;
  // console.log(pet)
  return (

    <div className="card w-80 bg-base-100 text-white shadow-xl border">

      {/* Image */}
      <figure className="relative h-52 w-full">
        <Image
          src={image}
          alt={petName}
          fill
          className="object-cover"
        />

        {/* Species badge */}
        <div className="absolute top-3 right-3 badge badge-success text-white">
          {species}
        </div>
      </figure>

      {/* Body */}
      <div className="card-body">

        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title text-lg">{petName}</h2>
            <p className="text-sm text-gray-500">{breed}</p>
          </div>

          <p className="text-xs text-gray-500 text-right">
            {age} · {gender}
          </p>
        </div>

        {/* Status */}
        <div className="flex gap-2 mt-2">
          <span className="badge badge-success badge-outline">
            {healthStatus}
          </span>
          <span className="badge badge-info badge-outline">
            {vaccinationStatus}
          </span>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-2">
          📍 {location}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Button */}
        <div className="card-actions mt-3">
          <Link
            href={`/allpets/${_id}`}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}