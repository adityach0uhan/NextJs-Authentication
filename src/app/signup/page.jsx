'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const [userData, setuserData] = useState({
    username: "", password: "", email: ""
  })

  const [loading, setloading] = useState(false);
  const [buttonEnable, setbuttonEnable] = useState(false);
  const [buttonColor, setbuttonColor] = useState("red");

  const submitForm = async () => {
    try {
      setloading(true)
      const response = await axios.post('api/users/signup', userData);
      router.push('/login');
      console.log("User Sign Up Successfull",response)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {

    if (userData.email.length > 1 && userData.username.length > 1 && userData.password.length > 1){
      setbuttonEnable(true)
      setbuttonColor('bg-green-700');
    } else {
      setbuttonEnable(false)
      setbuttonColor('bg-red-500')
    }
  }, [userData])


  return (
    <>
      <div className=' md:w-96 w-full mx-auto  mt-16 flex-col items-center justify-center flex h-96 '>
        <h4 className='text-3xl mb-4'>{loading ? "Processing" : "Signup"}</h4>
        {/* username  */}
        <div id='username' className='flex h-16 mb-8 w-full flex-col items-center justify-center '>
          <label className='flex h-10' htmlFor="username">Username 👤 </label>
          <input
            value={userData.username}
            onChange={(e) => { setuserData({ ...userData, username: e.target.value }) }}
            className='p-2 w-3/4 rounded-xl h-10 border border-black border-1'
            type="text"
            placeholder='Username.... ' />
        </div>

        {/* email  */}
        <div id='email' className='flex h-16 mb-8 w-full flex-col items-center justify-center'>
          <label className='flex h-10 ' htmlFor="username">Email 📧 </label>
          <input
            value={userData.email}
            onChange={(e) => { setuserData({ ...userData, email: e.target.value }) }}
            className='p-2 w-3/4 rounded-xl h-10 border border-black border-1'
            type="text"
            placeholder='Email.... ' />
        </div>

        {/* password */}
        <div id='password' className='flex h-16 mb-8 w-full flex-col items-center justify-center'>
          <label className='flex h-10 ' htmlFor="username">Password 🔑 </label>
          <input
            value={userData.password}
            onChange={(e) => { setuserData({ ...userData, password:e.target.value }) }}
            className='p-2 w-3/4 rounded-xl h-10 border border-black border-1'
            type="password"
            placeholder='Password.... ' />
        </div>

        <button
          onClick={submitForm}
          className={`border-1 h-8 border-black w-3/4  p-2 rounded-lg ${buttonColor} text-center flex items-center justify-center` } >
          {buttonEnable ? 'Sign Up  ' : "🚫 All inputs are necessary"}
        </button>
        <Link className='mt-2 text-blue-700' href='/login'>Already registered❓Login here</Link>
      </div>
    </>
  )
}

export default SignUp