'use client'

import DogCard from '@/components/Core/DogCard';

export const DashboardView = () => {
    
// Container general del Dashboard
    return (
        <div className='flex items-center justify-center h-dvh max-md:-mt-20 p-8'>
            <DogCard />
        </div>
    );
};
