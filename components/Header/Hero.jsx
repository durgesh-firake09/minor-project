'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'


function Hero() {
  const styles = {
    bgGradient:
      'bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20',
    btn: 'px-5 rounded-md font-medium border-indigo-600 py-2 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
  }

  const parentVariants = {
    hidden: { x: -300, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.3 },
    },
  }
  const imgVariants = {
    hidden: { x: 500, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.5 },
    },
  }
  const childVariants = {
    hidden: { x: -300, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
    },
  }

  return (
    <>
      <section
        className={`py-20 p-4 md:py-40 relative overflow-hidden text-white`} style={{background:"#1b2236"}}
      >
        {/* Backgound */}
        <motion.div
          variants={parentVariants}
          initial='hidden'
          animate='show'
          className='absolute  inset-0 bg-no-repeat bg-bottom'
        >
          <motion.div><img

            src="assets/hero.png"
            alt='fuck off'
            className='object-cover w-full h-full'
          ></img>
          </motion.div>
        </motion.div>
        {/* Content */}
        <div className='container max-w-6xl mx-auto'>
          <motion.div
            variants={parentVariants}
            initial='hidden'
            animate='show'
            className='flex flex-col space-y-6 items-start'
          >
            {/* Heading */}
            <motion.h1
              variants={childVariants}
              className='text-5xl font-bold max-w-lg leading-normal'
            >
              Revolutionizing Real Estate Investment            </motion.h1>
            {/* Paragraph */}
            <motion.p variants={childVariants} className='max-w-lg leading-6'>
              Welcome to TokenEstate, where real estate investment meets blockchain innovation. Unlock new possibilities with fractional ownership of premium properties. Join us as we democratize real estate investment for all.
            </motion.p>
            {/* CTA */}
            <Link href="/discover">
              <motion.button variants={childVariants} className={styles.btn}>
                Discover
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero
