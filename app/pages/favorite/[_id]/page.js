'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavCard from '../../../components/FavCard';

const Page = ({ params }) => {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get('/api/fav', {
                params: {
                    id: params._id 
                }
            });
            setFavorites(response.data);
            console.log('Favorites:', response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className='flex justify-center p-2'>
            <div className='w-4/6 p-2 flex flex-col gap-2'>
                <h1 className='text-white text-4xl'>Favorite</h1>
                <hr />
                <div className='grid grid-cols-2'>
                    {favorites.map((favorite, index) => (
                        <FavCard key={index} game={favorite} fetchFavorites={fetchFavorites} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
