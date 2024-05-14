import React from 'react';

function Card({ game }) {
  return (
    <div className='w-72 h-96 rounded-md p-2 hover:border'>
      <div className='flex flex-col gap-2 text-white'>
        <img className='h-44' src={game.thumbnail} alt={game.title} />
        <h2 className='text-2xl'>{game.title}</h2>
        <hr />
        <div className="inline-block">
          <span>Genre: </span>
          <p className="text-xs bg-black px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.genre}</p>
        </div>
        <div className="inline-block">
          <span>Platform: </span>
          <p className="text-xs bg-black px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.platform}</p>
        </div>
        <div className="inline-block">
          <span>Release Date: </span>
          <p className="text-xs bg-black px-2 py-1 rounded-full min-w-11 w-auto inline-block hover:bg-gray-700">{game.release_date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
