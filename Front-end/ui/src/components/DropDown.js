import { IconCalendarEvent } from "@tabler/icons-react";
import axios from "axios";

function removeTodo(id, setToDos, email) {
	console.log(id);
  	axios.delete("http://localhost:3001/app", {
	data: {
		id: id
	  }
  })
  .then(function (res){
	axios.post("http://localhost:3001/app/todos", {
	  email: email,
	})
	.then(function (res) {
	  setToDos(res.data);
	})
	.catch(function () {
	  console.log("Network error");
	});
	// console.log(res);
  })
  .catch(function (res) {
    console.log("Network error");
  });
}

window.oncontextmenu = function (e) {
  e.preventDefault();
  const openDropdowns = document.querySelectorAll(
    "[data-te-dropdown-menu-ref]:not(.hidden)"
  );
  for (let i = 0; i < openDropdowns.length; i++) {
    openDropdowns[i].classList.add("hidden");
  }
  const dropdownMenu = e.target
    .closest("[data-te-dropdown-ref]")
    .querySelector("[data-te-dropdown-menu-ref]");
  if (dropdownMenu) {
    dropdownMenu.classList.remove("hidden");
  }
};

window.addEventListener("click", function (e) {
  const openDropdowns = document.querySelectorAll(
    "[data-te-dropdown-menu-ref]:not(.hidden)"
  );
  for (let i = 0; i < openDropdowns.length; i++) {
    openDropdowns[i].classList.add("hidden");
  }
});

export default function DropDown(props) {
  return (
    <div class="flex justify-start items-center">
      <div>
        <div class="relative" data-te-dropdown-ref>
          <button
            class="flex items-center whitespace-nowrap rounded-0 px-2 pt-2.5 pb-2 text-[15px] font-medium  text-white"
            type="button"
            id="dropdownMenuButton1"
            aria-expanded="false"
          >
            <IconCalendarEvent
              className="pr-1"
              height={19}
              color="white"
              strokeWidth="2"
            />
            {props.name}
          </button>
          <ul
            class="absolute z-[1000] float-right m-0 hidden w-full list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref
          >
            <li>
              <button
                class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#174a41] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
					removeTodo(props.id, props.setToDos, props.email);
				}}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
