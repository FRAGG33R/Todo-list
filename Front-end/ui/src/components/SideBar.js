
import App from "./App"
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useInsertionEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { IconNotes , IconPlus } from '@tabler/icons-react';

export default function SideBar() {
	const { user, isAuthenticated, isLoading  } = useAuth0();

	useEffect(() => {

	}, [isAuthenticated, user]);
	if (isLoading)
		return <h1>loading ...</h1>
	else if (!isLoading && !isAuthenticated)
		return (<Navigate to="/" />)
	else
	return (
		<div class="contianer min-h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
			<div class="flex flex-col w-56 rounded-r-3xl overflow-hidden drop-shadow-2xl bg-[#1c5d51]">
				<div class="relative w-full pt-4 flex items-center justify-center ">
					<img class="w-10 h-10 rounded-full" src={user?.picture} alt="" />
				</div>
					<ul class="flex pl-3 flex-col space-y-4 py-4">
						<li>
							<a href="#_" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white">
								<IconNotes height={18} color="white" stroke-width="1.25" />
								<span class="text-sm font-medium pl-1">asdjlkf</span>
							</a>
						</li>
					</ul>
					<button href="#_" class="self-center flex items-center justify-center w-[40px] h-[40px] font-medium bg-[#113932] hover:bg-[#113932] hover:text-blue-600 text-blue-500 rounded-full text-sm">
						<IconPlus color="white" />
					</button>
			</div>
			<App />
		</div>
			
	)

}