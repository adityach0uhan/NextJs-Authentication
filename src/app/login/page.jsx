'use client'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
const LoginPage = () => {
  const router = useRouter()
  const [buttonColor, setbuttonColor] = useState("bg-red-400");
  const [userData, setuserData] = useState({ email: '', password: '' });
  const [loading, setloading] = useState(false);
  const [buttonState, setbuttonState] = useState(true);

  const Login = async () => {
    try {
      setloading(true)
      await axios.post('/api/users/login', userData).then((response) => {
        console.log('login Successfull')
        console.log(response)
        router.push('/')
      }).catch((error) => {
        console.log(error)
        router.push('/login')
      })
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (userData.email.length > 1 && userData.password.length > 1) {
      setbuttonState(false)
      setbuttonColor('bg-green-400');
    }
  }, [userData])

  return (
    <>
      <div className='w-screen h-screen  flex flex-col gap-5 items-center justify-center  '>
        <div id='password' className='flex h-16 mb-8 w-full flex-col items-center justify-center'>
          <h1 className='text-3xl mb-4'>{loading?'Processing':'Login'}</h1>
          <label className=' mb-2' htmlFor="email">Email</label>
          <input
            value={userData.email}
            onChange={(e) =>
              setuserData(
                {
                  ...userData,
                  email: e.target.value 
                })}
            type="text"
            className='h-20 rounded-xl p-2' />
        </div>

        <div id='password' className='flex h-16 mb-8 w-full flex-col items-center justify-center'>
          <label htmlFor="password" className='mb-2'>Password</label>
          <input
            value={userData.password}
            onChange={(e) => {
              setuserData(
                {
                  ...userData,
                  password: e.target.value
                })
            }}
            type="password"
            className='h-20 rounded-xl p-2' />
        </div>
        <button
          onClick={Login}
          disabled={buttonState}
          className={`w-56 bg-green h-10 rounded-xl p-2 ${buttonColor}`}>
          {
            buttonState ?'Both Fields Are mandatory':'Login..'
          }</button>
      </div>
    </>
  )
}

export default LoginPage