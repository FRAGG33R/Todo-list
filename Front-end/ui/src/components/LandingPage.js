import Spline from '@splinetool/react-spline';

import LandingPageBackground from '../assets/LandingPageBackground.png'

export default function LandingPage() {

	return (
		<div className="h-screen w-full flex items-center flex-col  bg-[#85ceb9] sm:space-y-72 xs:space-y-24 font-display">
			<div className='h-screen w-full xs:hidden sm:block filter absolute top-0 left-0 right-0 bottom-0'>
				<Spline scene="https://prod.spline.design/gTN8efUPLiCmsr-U/scene.splinecode" />
			</div>
			{/* <div className='h-screen w-full xs:block sm:hidden flex flex-col items-center justify-center  absolute top-0 left-0 right-0 bottom-0'>
				<img src={LandingPageBackground}/ >
			</div> */}
			<div className="z-10 3xl:w-3/5 xs:w-full min-h-1 flex items-center justify-center flex-col  text-[#1c5d51]">
				<div className="w-11/12 flex items-center justify-center flex-col space-y-8">
					<div className='4xl:text-6xl xl:text-5xl sm:text-4xl xs:text-2xl font-bold text-center tracking-wider'>KEEP YOUR LIFE UNDER CONTROL</div>
					<div className='2xl:text-2xl lg:text-xl md:text-lg sm:text-md xs:text-md font-normal sm:w-8/12 xs:w-full text-center '>Make every day more productive with our intuitive to-do list app. Stay organized, set priorities, and achieve your goals. Sign up now and start getting things done.</div>
				</div>
			</div>
			<div>
				<a href="#_" class="rounded-full px-5 py-2.5 overflow-hidden group bg-[#1c5d51] relative hover:bg-gradient-to-r hover:from-[#32D8AC] hover:to-[#237e66] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#237e66] transition-all ease-out duration-300">
					<span class="relative">Start for free</span>
				</a>
			</div>
		</div>
	)
}