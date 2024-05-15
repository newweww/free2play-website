'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Page = ({ params }) => {
    const [game, setGame] = useState({})

    const fetchGame = async () => {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: { id: params.id },
            headers: {
                'X-RapidAPI-Key': 'f81aa3971dmsha19da3a86fb9d7dp1136d5jsn894b2fe3d049',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setGame(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchGame();
    }, []);

    const handleSite = () => {
        window.open(game.game_url, '_blank');
    }

    return (
        <div className='flex justify-center p-2'>
            <div className=' flex flex-col gap-2 w-4/6 p-5 items-center'>
                <div className='flex flex-row gap-5 p-2'>
                    <div className='w-1/2'>
                        <img className='w-full h-80' src={game.thumbnail} alt={game.title} />
                    </div>
                    <div className='w-2/3 text-white'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-4xl'>{game.title}</h1>
                            <hr />
                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-xl'>Genre: {game.genre}</p>
                                    <p className='text-xl'>Platform: {game.platform}</p>
                                    <p className='text-xl'>Release Date: {game.release_date}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-xl'>Developer: {game.developer}</p>
                                    <p className='text-xl'>Publisher: {game.publisher}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-white w-2/3 gap-5 flex flex-col'>
                    <button className='border rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={handleSite}>Website</button>
                    <hr />
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl'>Description:</p>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
