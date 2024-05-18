import React from 'react';
import { useRouter } from 'next/navigation';

function FavCard({ game, fetchFavorites }) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/pages/${game.gameId}`);
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/fav?id=${game.gameId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchFavorites();
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    }

    return (
        <div className=' text-white flex flex-row rounded-md p-2 hover:border'>
            <div className='flex flex-row gap-5 w-full' onClick={handleClick}>
                <img className='h-20' src={game.img} alt={game.title} />
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl'>{game.title}</h2>
                    <hr />
                    <h2 className='text-lg'>{game.genre}</h2>
                </div>
            </div>
            <button className='text-red-500 border-red-500 border rounded-md p-2 hover:bg-red-500 hover:text-white ml-auto' onClick={handleDelete}>Remove</button>
        </div>

    );
}

export default FavCard;
