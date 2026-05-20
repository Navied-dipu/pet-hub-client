import React from 'react'
import FeatureCard from './FeatureCard';

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`)
const pets = await res.json()

export default function FeatureSection() {
    return (
        <div className='max-w-7xl mx-auto pb-5'>
            <h2 className='text-center text-6xl font-extrabold p-4'>
                Feature Section
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto'>
                {
                    pets
                        .slice(0, 6)
                        .map(pet => (
                            <FeatureCard
                                pet={pet}
                                key={pet._id}
                            />
                        ))
                }
            </div>
        </div>
    )
}