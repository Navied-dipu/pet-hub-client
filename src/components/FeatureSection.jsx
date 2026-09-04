import React from 'react'
import FeatureCard from './FeatureCard';

export default async function FeatureSection() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`)
    const pets = await res.json()
    return (
        <section className='bg-base-200/50 py-24'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <h2 className='text-primary font-bold tracking-wide uppercase text-sm mb-3'>Meet Our Pets</h2>
                    <h3 className='text-4xl md:text-5xl font-black text-base-content mb-6'>
                        Waiting for their <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary'>Forever Home</span>
                    </h3>
                    <p className='text-base-content/70 text-lg'>
                        These adorable companions are looking for a loving family. Take a look and you might just find your new best friend!
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        pets?.slice(0, 6).map(pet => (
                            <FeatureCard
                                pet={pet}
                                key={pet._id}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}