import Image from 'next/image'
import React from 'react'
import bannerImage from '@/assets/banner.png'
export const Banner = () => {
  return (
    <section className="border-b border-white/10">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">WORKOUT LIBRARY</p>
            <h1 className="display-font max-w-3xl text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                TRAIN WITH INTENT. LOG 
                <br />EVERY SET.
                </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                into today's plan, and watch the week's work add up.</p>
            <button className='btn btn-success'>BROWSE WORKOUTS</button>
        </div>
        <div>
            <Image src={bannerImage} alt='bannerImage'/>
        </div>
    </div>
    </section>
  )
}

export default Banner;