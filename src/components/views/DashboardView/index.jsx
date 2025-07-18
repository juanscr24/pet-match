'use client'

import { Sidebar } from '@/components/Core/Sidebar';
import DogCard from '@/components/Core/DogCard';

export const DashboardView = () => {
    

    return (
        <div className='flex items-center h-dvh'>
            <Sidebar />
            <DogCard />
        </div>
    );
};
