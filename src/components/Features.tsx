import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'
import { explore1Img, explore2Img, exploreVideo } from '../utils'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
	const videoRef = useRef()

	useGSAP(() => {
		gsap.to('#heading', {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: '#container',
				start: 'top center',
				toggleActions: 'play none none none',
			},
		})
		gsap.fromTo(
			'#explore1,#explore2',
			{
				scale: 1.5,
				opacity: 0.5,
			},
			{
				scale: 1,
				opacity: 1,
				scrollTrigger: {
					trigger: '#explore1',
					start: 'top 70%',
					end: 'top 30%',
					scrub: true,
				},
			}
		)
		gsap.to('.feature-text', {
			translateY: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.feature-text-container',
				start: 'top 85%',
				toggleActions: 'play reverse play reverse',
			},
		})
		gsap.to('#video-container', {
			scrollTrigger: {
				trigger: '#video-container',
				start: 'top 60%',
			},
			onComplete: () => {
				videoRef.current.play()
			},
		})
	}, [])

	return (
		<section
			id='container'
			className='h-full common-padding bg-zinc relative overflow-hidden'
		>
			<div className='screen-max-width'>
				<header className='mb-12 w-full'>
					<h2 id='heading' className='section-heading translate-y-10 text-wrap'>
						Explore the full story.
					</h2>
				</header>
				<div className='flex flex-col justify-center items-center overflow-hidden'>
					<div className='mt-32 mb-24 pl-24'>
						<h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
						<h2 className='text-5xl lg:text-7xl font-semibold'>
							Forged in titanium.
						</h2>
					</div>
					<div className='flex flex-col gap-5'>
						<div
							id='video-container'
							className='aspect-square md:aspect-auto bg-black flex justify-center items-end'
						>
							<video ref={videoRef} className='w-full' src={exploreVideo} />
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<div className='aspect-square bg-black overflow-hidden'>
								<img id='explore1' src={explore1Img} />
							</div>
							<div className='aspect-square bg-black flex items-center justify-center overflow-hidden'>
								<img id='explore2' src={explore2Img} />
							</div>
						</div>
					</div>
					<div className='feature-text-container'>
						<div className='flex-1 flex-center'>
							<p className='feature-text g_text'>
								iPhone 15 Pro is
								<span className='text-white'>
									the first iPhone to feature an aerospace-grade titanium design
								</span>
								, using the same alloy that spacecrafts use for missions to
								Mars.
							</p>
						</div>

						<div className='flex-1 flex-center'>
							<p className='feature-text g_text'>
								Titanium has one of the best strength-to-weight ratios of any
								metal, making these our
								<span className='text-white'>lightest Pro models ever.</span>
								You'll notice the difference the moment you pick one up.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features
