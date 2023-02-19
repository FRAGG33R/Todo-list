import Spline from '@splinetool/react-spline';
import LandingPageBackground from '../assets/LandingPageBackground.png'

export default function LandingPage() {

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className='h-screen w-full xs:hidden md:block filter  blur-[2.8px] absolute top-0 left-0 right-0 bottom-0'>
				{/* <Spline scene="https://prod.spline.design/gTN8efUPLiCmsr-U/scene.splinecode" /> */}
			</div>
			{/* <div className='h-screen w-full xs:block md:hidden filter blur-[2.8px] absolute top-0 left-0 right-0 bottom-0'>
				<img src={LandingPageBackground}/ >
			</div> */}
			<div className="z-10 font-display w-1/2 h-1/2 bg-red-400 flex items-center justify-center flex-col space-y-10">
				<div className='text-7xl font-bold	'>KEEP YOUR LIFE UNDER CONTROL</div>
				<div className='text-2xl font-light w-9/12'>Make every day more productive with our intuitive to-do list app. Stay organized, set priorities, and achieve your goals. Sign up now and start getting things done.</div>
			</div>
		</div>
	)
}