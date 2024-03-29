import Spline from "@splinetool/react-spline";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from './NavBar';
import SideBar from "./SideBar";
import { useEffect } from "react";


export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();
  return (
	<>
		<NavBar />
		<div className="h-screen w-full flex items-center justify-center flex-col sm:bg-gradient-to-r sm:from-[#85ceb9] sm:via-[#85ceb9] sm:to-[#85ceb9] xs:bg-gradient-to-r xs:from-[#85ceb9] xs:via-[#85ceb9] xs:to-[#85ceb9] font-rubik">
			<div className="h-full w-full xs:hidden sm:block  absolute top-0 left-0 right-0 bottom-0">
				<Spline scene="https://prod.spline.design/HN2eLZsQfEEPvTa4/scene.splinecode" />
			</div>

			<div className="z-10 3xl:w-3/5 xs:w-full min-h-1 flex flex-col items-center justify-center text-[#1c5d51]">
				<div className="w-11/12 flex items-center justify-center flex-col space-y-8">
				<div className="4xl:text-6xl xl:text-5xl sm:text-4xl xs:text-2xl font-bold text-center tracking-wider">
					KEEP YOUR LIFE UNDER CONTROL
				</div>
				<div className="2xl:text-2xl lg:text-xl md:text-lg sm:text-md xs:text-md font-light w-9/12 text-center">
					Make every day more productive with our intuitive to-do list app.
					Stay organized, set priorities, and achieve your goals. Sign up now
					and start getting things done.
				</div>
				<button
					className="px-5 py-2.5 relative rounded-full group text-white font-medium inline-block"
					onClick={() => {loginWithRedirect()}}
					>
					<span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-[#156d69]"></span>
					<span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-[#156d69] filter group-active:opacity-0 group-hover:blur-[5px] "></span>
					<span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-[#156d69]"></span>
					<span className="relative">Start for free</span>
				</button>
				</div>
			</div>
		</div>
	</>
  );
}
