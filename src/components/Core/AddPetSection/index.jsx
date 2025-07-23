"use client";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@/components/Core/Button';
import { MyPetsForm } from '@/components/Core/MyPetsForm';

export const AddPetSection = ({
    showForm,
    toggleForm,
    formData,
    handleChange,
    handleSubmit,
    isEditing
}) => {
    return (
        <div className="flex gap-6 items-center">
            <Button fit onClick={toggleForm} className='bg-white/20 hover:bg-white/50'>
                <AddCircleOutlineIcon className="text-white" fontSize="large" />
            </Button>

            {showForm && (
                <MyPetsForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isEditing={isEditing}
                />
            )}
        </div>
    );
};
