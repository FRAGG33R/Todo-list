
import App from "./App"
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useInsertionEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

export default function SideBar() {
	const { user, isAuthenticated, isLoading  } = useAuth0();
	const [counter, setCounter] = useState(3);

	useEffect(() => {

	}, [isAuthenticated, user]);
	if (isLoading)
		return <h1>loading</h1>
	else if (!isLoading && !isAuthenticated)
		return (<Navigate to="/" />)
	else
	return (
		<div class="contianer min-h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
			<div class="flex flex-col w-56 rounded-r-3xl overflow-hidden drop-shadow-2xl bg-[#1c5d51]">
			<div class="relative w-full pt-4 flex items-center justify-center ">
				<img class="w-10 h-10 rounded-full" src={user?.picture} alt="" />
			</div>
				<ul class="flex flex-col space-y-4 py-6">
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-home"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-music"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-drink"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-shopping-bag"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-chat"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#__" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg "><i class="bx bx-user"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				<li>
					<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-log-out"></i></span>
					<span class="text-sm font-medium">lorem ipsume</span>
					</a>
				</li>
				</ul>
			</div>
			<App />
		</div>
			
	)

}