import React from 'react'
import FeatureCard from './FeatureCard';

const pets = [
    {
        id: 1,
        name: 'Buddy',
        type: 'Dog',
        breed: 'Golden Retriever',
        age: '2 years',
        gender: 'Male',
        location: 'Dhaka, BD',
        description: 'Buddy is a playful and affectionate Golden Retriever who loves long walks and cuddle sessions. Great with kids and other pets!',
        tags: ['Friendly', 'Vaccinated', 'Trained'],
        emoji: '🐕',
        color: '#FFF7ED',
        accent: '#F97316',
        tagBg: '#FED7AA',
        tagColor: '#C2410C',
    },
    {
        id: 2,
        name: 'Luna',
        type: 'Cat',
        breed: 'Persian',
        age: '3 years',
        gender: 'Female',
        location: 'Chittagong, BD',
        description: 'Luna is a calm and elegant Persian cat who loves cozy spots and gentle petting. Perfect for a quiet home environment.',
        tags: ['Calm', 'Vaccinated', 'Indoor'],
        emoji: '🐈',
        color: '#FDF4FF',
        accent: '#A855F7',
        tagBg: '#F3E8FF',
        tagColor: '#7E22CE',
    },
    {
        id: 3,
        name: 'Milo',
        type: 'Rabbit',
        breed: 'Holland Lop',
        age: '1 year',
        gender: 'Male',
        location: 'Sylhet, BD',
        description: 'Milo is an energetic little Holland Lop who loves to explore and play. Easy to care for and very affectionate.',
        tags: ['Playful', 'Healthy', 'Kid-Friendly'],
        emoji: '🐰',
        color: '#F0FDF4',
        accent: '#22C55E',
        tagBg: '#DCFCE7',
        tagColor: '#15803D',
    },
    {
        id: 4,
        name: 'Kiwi',
        type: 'Bird',
        breed: 'Lovebird',
        age: '8 months',
        gender: 'Female',
        location: 'Rajshahi, BD',
        description: 'Kiwi is a vibrant Lovebird full of personality. She loves to sing, interact, and brighten up any room she\'s in.',
        tags: ['Social', 'Healthy', 'Talkative'],
        emoji: '🦜',
        color: '#FFFBEB',
        accent: '#F59E0B',
        tagBg: '#FEF3C7',
        tagColor: '#B45309',
    },
    {
        id: 5,
        name: 'Max',
        type: 'Dog',
        breed: 'Beagle',
        age: '4 years',
        gender: 'Male',
        location: 'Khulna, BD',
        description: 'Max is a loyal and curious Beagle with a great nose for adventure. He\'s house-trained and gets along with everyone.',
        tags: ['Loyal', 'Vaccinated', 'House-Trained'],
        emoji: '🐶',
        color: '#FFF1F2',
        accent: '#F43F5E',
        tagBg: '#FFE4E6',
        tagColor: '#BE123C',
    },
    {
        id: 6,
        name: 'Nala',
        type: 'Cat',
        breed: 'Siamese',
        age: '2 years',
        gender: 'Female',
        location: 'Dhaka, BD',
        description: 'Nala is a chatty and intelligent Siamese who craves attention and loves to follow you around like a shadow.',
        tags: ['Affectionate', 'Vaccinated', 'Playful'],
        emoji: '😸',
        color: '#EFF6FF',
        accent: '#3B82F6',
        tagBg: '#DBEAFE',
        tagColor: '#1D4ED8',
    },
];
export default function FeatureSection() {
    return (
        <div className='max-w-7xl mx-auto pb-5'>
            <h2 className='text-center'>FeatureSection</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    pets.map(pet => <FeatureCard pet={pet} key={pet.id} ></FeatureCard>)
                }
            </div>
        </div>
    )
}
