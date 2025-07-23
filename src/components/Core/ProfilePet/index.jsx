'use client';
import { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from '../Button';

const images = [
    '/img/profile/dog-1.webp',
    '/img/profile/dog-2.webp',
    '/img/profile/dog-3.webp',
];

export const ProfilePet = () => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [showMenu, setShowMenu] = useState(false);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        setShowMenu(false);
    };

    return (
        <div className='flex flex-col gap-8 justify-center items-center -mb-14 max-md:flex-row max-md:mb-0'>
            <div className='flex gap-2 items-center'>
                <h1 className="text-xl font-bold text-gray-200">PetMatch</h1>
            </div>

            <div className='relative'>
                <img
                    alt='UserPet'
                    src={selectedImage}
                    width={100}
                    height={100}
                    className='object-cover max-md:w-10 max-sm:hidden'
                />
                <Button onClick={() => setShowMenu(!showMenu)} className='absolute bg-transparent -bottom-3 -right-5 p-1 max-sm:hidden'>
                    <EditNoteIcon className='cursor-pointer text-gray-200' fontSize='inherit' />
                </Button>

                {showMenu && (
                    <div className='grid grid-cols-3 absolute top-full mt-2 bg-gray-200 shadow-lg rounded-lg p-2 w-[150px] gap-2 z-10'>
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Option ${index + 1}`}
                                width={50}
                                height={50}
                                className='cursor-pointer rounded-full border-2 p-1 border-transparent hover:border-gray-500'
                                onClick={() => handleImageSelect(img)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
