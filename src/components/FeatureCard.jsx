import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaHeartbeat, FaSyringe } from "react-icons/fa";

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

  return (
    <div className="group card bg-base-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 border border-base-200/60 overflow-hidden">
      
      {/* Image */}
      <figure className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={petName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Species badge */}
        <div className="absolute top-4 right-4 backdrop-blur-md bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
          {species}
        </div>

        <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold tracking-tight mb-1">{petName}</h2>
            <p className="text-sm text-white/80 font-medium flex items-center gap-1">
                {breed} • {age} • {gender}
            </p>
        </div>
      </figure>

      {/* Body */}
      <div className="card-body p-6">
        
        {/* Status */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-success badge-sm badge-outline flex gap-1 py-3 px-3">
            <FaHeartbeat className="text-success" /> {healthStatus}
          </span>
          <span className="badge badge-info badge-sm badge-outline flex gap-1 py-3 px-3">
            <FaSyringe className="text-info" /> {vaccinationStatus}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        {/* Location & Button */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-base-200">
            <div className="flex items-center text-sm text-base-content/60 gap-1.5 font-medium max-w-[50%]">
                <FaMapMarkerAlt className="text-primary/70 shrink-0" />
                <span className="truncate">{location}</span>
            </div>
            <Link
                href={`/allpets/${_id}`}
                className="btn btn-primary rounded-xl px-6 hover:shadow-lg hover:shadow-primary/30 transition-all text-sm font-semibold"
            >
                View Details
            </Link>
        </div>

      </div>
    </div>
  );
}