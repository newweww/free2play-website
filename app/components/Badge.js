import React from 'react'

const Badge = ({ game }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className="inline-block">
                <span>Genre: </span>
                <p className="text-xs bg-white text-black px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.genre}</p>
            </div>
            <div className="inline-block">
                <span>Platform: </span>
                <p className="text-xs bg-white text-black  px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.platform}</p>
            </div>
            <div className="inline-block">
                <span>Release Date: </span>
                <p className="text-xs bg-white text-black  px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.release_date}</p>
            </div>
        </div>
    )
}

export default Badge