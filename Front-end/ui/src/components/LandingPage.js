import Spline from '@splinetool/react-spline';

export default function LandingPage() {

	return (
		<div className="h-screen w-full flex items-center flex-col sm:bg-gradient-to-r sm:from-[#85ceb9]  sm:via-[#85ceb9]  sm:to-[#85ceb9]  xs:bg-gradient-to-r xs:from-green-200 xs:via-[#85ceb9] xs:to-[#85ceb9] sm:space-y-72 xs:space-y-24 font-rubik">
			<div className='h-screen w-full xs:hidden sm:block  absolute top-0 left-0 right-0 bottom-0'>
				<Spline scene="https://prod.spline.design/gTN8efUPLiCmsr-U/scene.splinecode" />
			</div>
			<div className="z-10 3xl:w-3/5 xs:w-full max-h-3/5 flex items-center space-y-80 flex-col  text-[#1c5d51]">
				<div className="w-11/12 flex items-center justify-center flex-col space-y-8">
					<div className='4xl:text-6xl xl:text-5xl sm:text-4xl xs:text-2xl font-bold text-center tracking-wider'>KEEP YOUR LIFE UNDER CONTROL</div>
					<div className='2xl:text-2xl lg:text-xl md:text-lg sm:text-md xs:text-md font-light w-9/12 text-center'>Make every day more productive with our intuitive to-do list app. Stay organized, set priorities, and achieve your goals. Sign up now and start getting things done.</div>
				</div>
			</div>
			<a href="#_" class="px-5 py-2.5 relative rounded-full group text-white font-medium inline-block">
				<span class="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-tr from-[#32D8AC] to-[#0F5A56]"></span>
				<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-tr filter group-active:opacity-0 group-hover:blur-sm from-[#32D8AC] to-[#0F5A56]"></span>
				<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-[#32D8AC] from-[#0F5A56]"></span>
				<span class="relative">Start for free</span>
			</a>
		</div>
	)
}