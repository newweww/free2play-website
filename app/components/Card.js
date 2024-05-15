import React from 'react';
import Badge from './Badge';
import { useRouter } from 'next/navigation';

function Card({ game }) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/pages/${game.id}`);
  }

  return (
    <div className='w-72 h-96 rounded-md p-2 hover:border' onClick={handleClick}>
      <div className='flex flex-col gap-2 text-white'>
        <img className='h-44' src={game.thumbnail} alt={game.title} />
        <h2 className='text-2xl'>{game.title}</h2>
        <hr />
        <Badge game={game} />
      </div>
    </div>
  );
}

export default Card;
