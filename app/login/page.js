'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { data: session } = useSession()
    if (session) {
        redirect('/')
    }
    
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res.error) {
                setError("invalid")
                return;
            }

            router.replace('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg'>
                    <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>

                    {error &&
                            <p className='text-red-500'>{error}</p>
                        }

                        <h1 className='text-2xl font-bold'>Login</h1>
                        <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <button type='submit' className='bg-blue-500 text-white rounded-lg p-2 mt-4 w-80'>Sign In</button>
                    </form>
                    <hr className='my-3' />
                    <p>Do not have an account? go to <Link className='text-blue-500 hover:underline' href='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage