import { IconCalendarEvent } from "@tabler/icons-react";
import axios from "axios";

window.oncontextmenu = function (e) {
  //   e.preventDefault();
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
  const updateData =  () => {
    axios
      .post("http://localhost:3001/app/todos", {
        email: props.email,
      })
      .then(function (res) {
        props.setToDos(res.data);
      })
      .catch(function () {
        console.log("Network error");
      });
     axios
      .get("http://localhost:3001/app/list", { params: { id: props.id } })
      .then(function (res) {
        props.setTasks(res.data);
      })
      .catch(function () {
        console.log("crash");
      });
  };
  function removeTodo(id) {
    axios
      .delete("http://localhost:3001/app", {
        data: {
          id: id,
        },
      })
      .then(() => {
        updateData();
      })
      .catch(function (res) {
        console.log("Network error");
      });
  }
  return (
    <div className="flex justify-start items-center w-full">
      <div className="w-full">
        <div className="relative w-full" data-te-dropdown-ref>
          <button
            className="w-11/12 flex items-center whitespace-nowrap rounded-lg border border-white px-2 pt-2.5 pb-2 text-[15px] tracking-[0.15rem] font-normal text-white hover:bg-[#277063] "
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
            <div className="w-10/12 text-left">{props.name}</div>
          </button>
          <ul
            className="absolute z-[1000] float-right mt-2  hidden w-11/12 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref
          >
            <li >
              <button
                className="block  w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#174a41] hover:bg-neutral-100 active:text-neutral-800 active:no-underline"
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
