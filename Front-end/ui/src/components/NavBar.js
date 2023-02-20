
import Logo1 from "../assets/logo.png";
import { Collapse } from 'flowbite';

export default function NavBar() {
  
  return (
    <nav class="font-rubik sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 ">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" class="flex items-center">
          <img
            src={Logo1}
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#1c5d51]">
            Todo
          </span>
        </a>
        <div class="flex md:order-2">
			<a href="#_" class="px-5 py-2.5 relative rounded-full group text-white font-medium inline-block">
				<span class="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-tr from-[#32D8AC] to-[#0F5A56]"></span>
				<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full bg-gradient-to-tr filter group-active:opacity-0 group-hover:blur-sm from-[#32D8AC] to-[#0F5A56]"></span>
				<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-[#32D8AC] from-[#0F5A56]"></span>
				<span class="relative">Start for free</span>
			</a>
        </div>
      </div>
    </nav>
  );
}
