// src/lib/api.js
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const handleMatch = async ({ userId, petId, liked }) => {
    try {
        const match = {
            id: uuidv4(),
            userId,
            petId,
            liked
        };

        const response = await axios.post('http://localhost:3001/matches', match);
        console.log('✅ Match guardado:', response.data);
    } catch (error) {
        console.error('❌ Error guardando match:', error);
    }
};

