
import App from "./App"
// import Logo from '../assets/SideBarLogo.png'
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useInsertionEffect } from "react";


export default function SideBar() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	useEffect(() => {
		console.log(user, isAuthenticated);
	}, []);
	if (isLoading)
	{
		return (<div>Loading....</div>)
	}
	return (
		 <div class="min-h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
			<div class="flex flex-col w-56 rounded-r-3xl overflow-hidden drop-shadow-2xl bg-[#1c5d51]">
				<div class="flex items-center justify-center h-20">
					{/* <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user.picture} alt="User dropdown" />
					<div id="userDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
						<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
							<div>{user.name}</div>
							<div class="font-medium truncate">{user.email}</div>
						</div>
						<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
							</li>
						</ul>
						<div class="py-1">
							<a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
						</div>
					</div> */}
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