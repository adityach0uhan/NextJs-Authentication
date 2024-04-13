'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
const VerifyEmailPage = () => {
  const router = useRouter()
  const [token, settoken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams();

  useEffect(() => {
    settoken(searchParams[1])
  }, [])

  const VerifyEmail = async () => {
    try {

      const response = await axios.post("/api/users/verifyemail", { token })
      console.log(response)
      router.push('/login')
      
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex w-screen flex-col gap-9 h-screen items-center justify-center' >

        <div>By Clicking the button you will be verified </div>
        <button
          onClick={VerifyEmail}
          className='bg-green-400 hover:bg-green-600 w-1/2 h-16 rounded-xl md:w-72'
        >
          Click here to Verify
        </button>



      </div>
    </>
  )
}

export default VerifyEmailPage