import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = () => {
	useGSAP(() => {
		gsap.to('.hero-title', {
			opacity: 1,
			delay: 1,
		})
		gsap.fromTo(
			'#cta',
			{
				translateY: 30,
				opacity: 0,
			},
			{
				translateY: 0,
				opacity: 1,
				delay: 1,
				stagger: 0.5,
			}
		)
	}, [])

	return (
		<section className='min-h-screen grid place-items-center'>
			<div className='max-w-5xl sm:translate-y-20'>
				<h1 className='hero-title'>iPhone 15 Pro</h1>
				<video
					className='sm:block hidden'
					autoPlay
					src='/assets/videos/hero.mp4'
				/>
				<video
					className='max-h- sm:hidden'
					autoPlay
					src='/assets/videos/smallHero.mp4'
				/>
			</div>
			<div className='align-self-end flex flex-col items-center' id='cta'>
				<button className='btn'>Buy Now</button>
				<p className='font-normal text-xl'>
					From $999 or $41.62/mo. for 24 mo.
				</p>
			</div>
		</section>
	)
}

export default Hero
