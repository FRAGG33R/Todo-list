import Spline from '@splinetool/react-spline';
import LandingPageBackground from '../assets/LandingPageBackground.png'

export default function LandingPage() {

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className='h-screen w-full xs:hidden md:block filter  blur-[3.4px] absolute top-0 left-0 right-0 bottom-0'>
				<Spline scene="https://prod.spline.design/gTN8efUPLiCmsr-U/scene.splinecode" />
			</div>
			{/* <div className='h-screen w-full xs:block md:hidden filter blur-[2.8px] absolute top-0 left-0 right-0 bottom-0'>
				<img src={LandingPageBackground}/ >
			</div> */}
			<div className="z-10 font-display 3xl:w-1/2 xs:w-9/12 min-h-1 flex items-center justify-center flex-col space-y-10 ">
				<div className='2xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-3xl font-semibold text-center'>KEEP YOUR LIFE UNDER CONTROL</div>
				<div className='2xl:text-2xl  lg:text-xl md:text-lg sm:text-md xs:text-md font-normal xl:w-9/12 xs:w-11/12 text-center'>Make every day more productive with our intuitive to-do list app. Stay organized, set priorities, and achieve your goals. Sign up now and start getting things done.</div>
				<div>
					<a href="#_" class="rounded-full px-5 py-2.5 overflow-hidden group bg-[#239a7a] relative hover:bg-gradient-to-r hover:from-[#32D8AC] hover:to-[#237e66] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#237e66] transition-all ease-out duration-300">
						<span class="relative">Start for free</span>
					</a>
				</div>
			</div>
		</div>
	)
}