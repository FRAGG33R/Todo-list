import Logo1 from "../assets/logo.png";

export default function NavBar() {
  return (
    <nav class="font-rubik sm:px-4 py-2.5 fixed w-full top-0 left-0">
      <div class="sm:container flex items-center justify-between mx-auto w-full xs:pl-3 xs:pr-3 md:pl-0 md:pr-0">
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
				<span class="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-[#156d69]"></span>
				<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-[#156d69] filter group-active:opacity-0 group-hover:blur-[5px] "></span>
				<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-[#156d69]"></span>
				<span class="relative">Start for free</span>
			</a>
        </div>
      </div>
    </nav>
  );
}
