'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const Nav = () => {

  const router = useRouter()

  return (
    <div className='p-4'>
      <div className='text-white flex flex-row justify-between items-center'>
        <div>FREE2PLAY</div> 
        <div className='flex space-x-4'>
          <button className='border rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/')}>Home</button>
          <button className='border rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/pages/category')}>Category</button>
          <button className='border rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/pages/category')}>Favorite</button>
          <button className='border rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/pages/feedback')}>Feedback</button>
        </div>
      </div>
    </div>
  )
}
