import Link from 'next/link'
import React from 'react'

export default function FeatureCard({ pet }) {
    const { name, type, breed, age, gender, location, description } = pet

    return (
        <div
            className="card w-96 shadow-sm text-black"
            style={{ backgroundColor: "#FEFCE8" }}
        >
            <figure className="text-8xl pt-8">
                😸
            </figure>

            <div className="card-body text-black">
                <h2 className="card-title flex justify-between items-center">
                    {name}
                    <div
                        className="badge border-none text-black"
                        style={{ backgroundColor: "#FEF08A" }}
                    >
                        {type}
                    </div>
                </h2>

                <p className="font-semibold">Breed: {breed}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <p>Location: {location}</p>

                <p className="mt-2 ">
                    {description}
                </p>

                <div className="card-actions justify-end mt-4">
                    {pet.tags.map((tag) => (
                        <div
                            key={tag}
                            className="badge badge-outline text-black"
                            style={{
                                backgroundColor: "#FEF9C3",
                                color: "#854D0E",
                                borderColor: "#FEF9C3",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <button className='btn'>View Details</button>
            </div>
        </div>
    )
}