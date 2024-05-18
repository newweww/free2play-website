'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'


export const Nav = () => {

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className='p-4'>
      <div className='text-white flex flex-row justify-between items-center'>
        <div>FREE2PLAY</div>
        <div className='flex space-x-4'>
          <button className=' rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/')}>Home</button>
          <button className=' rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push(`/pages/favorite/${session.user._id}`)}>Favorite</button>
          {!session ? (
            <>
              <button className=' rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/login')}>SignIn</button>
              <button className=' rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => router.push('/register')}>SignUp</button>
            </>
          ) : (
            <button className='border-red-500  text-red-500 rounded-md min-w-20 h-10 p-2 hover:bg-red-500 hover:text-white' onClick={() => signOut()}>Logout</button>
          )}
        </div>
      </div>
    </div>
  )
}
