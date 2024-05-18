'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function RegsiterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { data: session } = useSession()
    if (session) {
        redirect('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required')
            return;
        }

        if (password !== confirmPassword) {
            setError('Password do not match')
            return;
        }

        try {
            const resCheckUser = await fetch('/api/checkuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const { user } = await resCheckUser.json()

            if (user) {
                setError('Email already exists')
                return;
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            if (res.ok) {
                const form = e.target;
                setError('')
                form.reset()
                setSuccess('User Registered Successfully')
            } else {
                console.log('something went wrong')
            }

        } catch (error) {
            setError(error)
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

                        {success &&
                            <p className='text-green-500'>{success}</p>
                        }

                        <h1 className='text-2xl font-bold'>Register</h1>
                        <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Username' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm Password' className='border border-gray-400 rounded-lg p-2 mt-4 w-80' />
                        <button type='submit' className='bg-blue-500 text-white rounded-lg p-2 mt-4 w-80'>Register</button>
                    </form>
                    <hr className='my-3' />
                    <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegsiterPage