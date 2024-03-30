import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'

gsap.registerPlugin(ScrollTrigger)

const Carousel = () => {
	const tl = gsap.timeline()
	const [current, setCurrent] = useState<any>(1)
	const [ended, setEnded] = useState(false)
	const videoRef = useRef<any>([])
	const videoSpanRef = useRef<any>([])
	const containerRef = useRef<any>([])
	const [start, setStart] = useState(false)
	const [seekTime, setSeekTime] = useState(0)

	useGSAP(() => {
		if (!containerRef.current[0] || current === hightlightsSlides.length + 1)
			return

		tl.to('#highlights-container', {
			scrollTrigger: {
				trigger: '#highlights-container',
				start: 'top center',
			},
			onComplete: () => {
				setStart(true)
				setCurrent(1)
				videoRef.current[0].play()
			},
		})
	}, [])

	useEffect(() => {
		if (start) {
			videoRef.current[current - 1].play()
		} else {
			videoRef.current[current - 1].pause()
		}
	}, [start])

	function changeTo(id: number): void {
		videoRef.current[current - 1].pause()
		videoRef.current[current - 1].currentTime = 0
		setCurrent(id)
		tl.to('#highlights-container', {
			translateX: `-${containerRef.current[0].clientWidth * (id - 1)}px`,
			onComplete: () => {
				videoRef.current[id - 1].play()
			},
		})
		setEnded(false)
		setStart(true)
	}

	useEffect(() => {
		const span = videoSpanRef.current[current - 1]
		const duration = hightlightsSlides[current - 1].videoDuration
		gsap.to(span, {
			width: `${(seekTime / duration) * 100}%`,
			background: 'white',
			onComplete: () => {
				gsap.to(span, {
					background: '#afafaf',
				})
			},
		})
	}, [seekTime])

	return (
		<div className='screen-max-width'>
			<div id='highlights-container' className={`flex`}>
				{hightlightsSlides.map((slide, i) => (
					<div
						className='pr-10 sm:pr-20 transition-transform'
						ref={el => (containerRef.current[i] = el)}
						key={slide.id}
					>
						<div className='video-carousel_container'>
							<div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black relative'>
								<div className='absolute top-5 left-5 uppercase font-semibold md:top-10 md:left-10 md:text-lg lg:text-2xl'>
									{slide.textLists.map(text => (
										<p key={text}>{text}</p>
									))}
								</div>
								<video
									// autoPlay={slide.id === current}
									ref={el => (videoRef.current[i] = el)}
									src={slide.video}
									onTimeUpdate={(e: any) => {
										setSeekTime(e.target.currentTime)
									}}
									onEnded={() => {
										if (slide.id === hightlightsSlides.length)
											return setEnded(true)
										tl.to('#highlights-container', {
											translateX: `-${
												containerRef.current[0].clientWidth * slide.id
											}px`,
											onStart: () => {
												setCurrent((prev: number) => prev + 1)
												setSeekTime(0)
												if (!start) return
												videoRef.current[slide.id].play()
											},
										})
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='flex mx-auto w-fit mt-10'>
				<div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
					{hightlightsSlides.map((slide, i) => (
						<span
							key={slide.id}
							className={`mx-2 ${
								slide.id === current ? 'w-10' : 'w-2'
							} h-2 bg-gray-200 overflow-hidden rounded-full relative cursor-pointer transition-all`}
							onClick={() => changeTo(slide.id)}
						>
							<span
								ref={el => (videoSpanRef.current[i] = el)}
								className='absolute h-full rounded-full'
							/>
						</span>
					))}
				</div>
				{ended ? (
					<button
						className='control-btn'
						onClick={() => {
							tl.to('#highlights-container', {
								translateX: 0,
							})
							setStart(true)
							setCurrent(1)
							setEnded(false)
							videoRef.current[0].play()
						}}
					>
						<img src={replayImg} alt='replay' />
					</button>
				) : (
					<button
						className='control-btn'
						onClick={() => setStart(prev => !prev)}
					>
						<img src={start ? pauseImg : playImg} />
					</button>
				)}
			</div>
		</div>
	)
}

export default Carousel
