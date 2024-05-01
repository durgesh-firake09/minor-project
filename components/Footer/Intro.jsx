'use client'
import React from 'react'
import {
  AiOutlineRadarChart,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillGithub,
} from 'react-icons/ai'
import { SiHashnode } from 'react-icons/si'

function Intro() {
  const styles = {
    socialIcon:
      'p-2 duration-300 ease-in-out self-start rounded-md border border-slate-700 bg-slate-800 hover:bg-indigo-600',
  }
  return (
    <>
      {/* Flex Container */}
      <div className='md:col-span-3 lg:col-span-2 flex flex-col space-y-4 justify-start text-white'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <AiOutlineRadarChart size={35} />
          <h3 className='text-lg font-bold uppercase'>Token Estate</h3>
        </div>
        {/* Intro */}
        <p className='text-slate-300 '>
          Revolutionizing Real Estate Investment
        </p>
        {/* Social Icons */}
        <div className='flex space-x-2'>
          <div className={styles.socialIcon}>
            <AiOutlineInstagram />
          </div>
          <div className={styles.socialIcon}>
            <AiFillLinkedin />
          </div>
          <div className={styles.socialIcon}>
            <AiOutlineTwitter />
          </div>
          <div className={styles.socialIcon}>
            <AiFillGithub />
          </div>
          <div className={styles.socialIcon}>
            <SiHashnode />
          </div>
        </div>
      </div>
    </>
  )
}

export default Intro
