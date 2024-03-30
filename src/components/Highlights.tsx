import React from 'react'
import { watchImg, rightImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Carousel from './Carousel'

gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {
	useGSAP(() => {
		gsap.to('.section-heading', {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: '#highlights',
				start: 'top center',
				toggleActions: 'play reverse play reverse',
			},
		})
		gsap.to('#link-1', {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: '#highlights',
				start: 'top center-=100',
				toggleActions: 'play reverse play reverse',
			},
		})
		gsap.to('#link-2', {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: '#highlights',
				start: 'top center-=200',
				toggleActions: 'play reverse play reverse',
			},
		})
	}, [])

	return (
		<section
			id='highlights'
			className='w-screen overflow-hidden h-full common-padding bg-zinc'
		>
			<div className='screen-max-width'>
				<header className='mb-12 w-full md:flex items-end justify-between flex-nowrap'>
					<h2 className='section-heading translate-y-10 text-wrap'>
						Get the highlights.
					</h2>
					<div className='flex flex-wrap items-end gap-5'>
						<a id='link-1' href='#' className='link'>
							Watch the film
							<img src={watchImg} />
						</a>
						<a id='link-2' href='#' className='link'>
							Watch the event
							<img src={rightImg} />
						</a>
					</div>
				</header>
			</div>
			<Carousel />
		</section>
	)
}

export default Highlights
