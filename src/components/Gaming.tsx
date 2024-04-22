import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Gaming = () => {
	const videoRef = useRef<any>()

	useGSAP(() => {
		gsap.fromTo(
			'#chip',
			{
				scale: 1.5,
			},
			{ scale: 1, scrollTrigger: '#chip' }
		)
		gsap.to('#videoContainer', {
			scrollTrigger: '#videoContainer',
			onComplete: () => {
				videoRef.current.play()
			},
		})
		gsap.to('.g_fadeIn', {
			opacity: 1,
			translateY: 0,
			scrollTrigger: '.g_fadeIn',
		})
	}, [])

	return (
		<section className='common-padding'>
			<div className='screen-max-width'>
				<div className='mx-auto w-fit'>
					<img id='chip' className='max-w-56' src={chipImg} />
				</div>
				<div className='flex flex-col my-24 items-center'>
					<h2 className='hiw-title'>
						A17 Pro chip.
						<br /> A monster win for gaming.
					</h2>

					<p className='hiw-subtitle'>
						It's here. The biggest redesign in the history of Apple GPUs.
					</p>
				</div>
				<div className='relative flex items-center'>
					<img className='absolute drop-shadow-2xl' src={frameImg} />
					{/* <span className='absolute h-full w-10 bg-black left-[-34px]'></span>
					<span className='absolute h-full w-10 bg-black right-[-34px]'></span> */}
					<div
						className='w-[95%] overflow-hidden mx-auto rounded-3xl'
						id='videoContainer'
					>
						<video ref={videoRef} src={frameVideo} />
					</div>
				</div>
				<p className='text-gray font-semibold text-center mt-10'>
					Honkai: Star Rail
				</p>
				<div className='hiw-text-container mt-16'>
					<div className='flex flex-1 justify-center flex-col'>
						<p className='hiw-text g_fadeIn'>
							A17 Pro is an entirely new class of iPhone chip that delivers our
							<span className='text-white'>
								best graphic performance by far
							</span>
							.
						</p>

						<p className='hiw-text g_fadeIn'>
							Mobile
							<span className='text-white'>
								games will look and feel so immersive
							</span>
							, with incredibly detailed environments and characters.
						</p>
					</div>

					<div className='flex-1 flex justify-center flex-col g_fadeIn'>
						<p className='hiw-text'>New</p>
						<p className='hiw-bigtext'>Pro-class GPU</p>
						<p className='hiw-text'>with 6 cores</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Gaming
