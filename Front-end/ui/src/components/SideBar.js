import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import axios from "axios";
import Modal from "./Modal";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

export default withAuthenticationRequired(SideBar, {
  onRedirecting: () => <Redirect />,
});

function Redirect() {
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    const id = setTimeout(() => {
      if (!isAuthenticated) window.location.href = "/";
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return <div></div>;
}

function SideBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [toDos, setToDos] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState(0);
  const [modal, setModal] = useState({
    title: "Create To-do list",
    description: "Create To-do list",
    state: false,
    button: "Add",
  });
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios
        .post("http://localhost:3001/app", {
          name: user.nickname,
          email: user.email,
        })
        .then(function (res) {})
        .catch(function () {
          console.log("Network error");
        });
      axios
        .post("http://localhost:3001/app/todos", {
          email: user.email,
        })
        .then(function (res) {
          setToDos(res.data);
        })
        .catch(function () {
          console.log("Network error");
        });
    }
  }, [isAuthenticated]);

  function createToDo(tempName, id) {
    if (tempName) {
      setToDos((prev) => [...prev, { name: tempName, id: id }]);
      setModal({
        title: "Create To-do list",
        description: "Create To-do list",
        state: false,
        button: "Add",
      });
    }
  }
  return (
    <div>
      <div className=" h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
        {!open && <button
          className="h-12 w-12 px-2 inline-flex items-center justify-center py-2 text-base font-medium leading-6 text-gray-700 whitespace-no-wrap focus:outline-none focus:shadow-none"
          onClick={() => {
            if (!open) setOpen(true);
            else setOpen(false);
          }}
        >
          {" "}
          <svg
            class="w-8 h-8"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>}
        {open && (
          <div className=" flex flex-col w-72 overflow-scroll overflow-x-hidden  scrollbar-thin scrollbar-thumb-[#16433a] scrollbar-track-[#1d5d51] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full  drop-shadow-2xl bg-[#1c5d51]">
            <div className="w-full pt-4 flex items-center justify-between px-4">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.picture}
                alt=""
              />
              {open && <button
				onClick={() => {
					setOpen(false);
				}}>
                <IconX color="white" />
              </button>}
            </div>
            <ul className="flex pl-3 flex-col space-y-4 py-4 w-full">
              {toDos.length > 0 &&
                toDos.map((item) => (
                  <li onClick={() => {
					setDisplayedTasks(item.id);
					console.log("U clicked on item number ", item.id);
				  }}>
                    <DropDown
                      name={
                        item.name.length < 20
                          ? item.name
                          : item.name.substr(0, 20) + "..."
                      }
                      id={item.id}
                      setToDos={setToDos}
                      email={user.email}
                    />
                  </li>
                ))}
            </ul>
            <div className="w-full h-16 flex items-center justify-center pb-4">
              <button
                onClick={() => {
                  setModal({
                    title: "Create To-do list",
                    description: "Create To-do list",
                    state: true,
                    button: "Add",
                  });
                }}
                href="#_"
                className="self-center flex items-center justify-center w-[40px] h-[40px] font-medium bg-[#113932] hover:bg-[#1a5047] rounded-full "
              >
                <IconPlus color="white" />
              </button>
            </div>
            <Modal
              state={modal.state}
              title={modal.title}
              description={modal.description}
              button={modal.button}
              email={user.email}
              add={createToDo}
            />
          </div>
        )}
        <App id={displayedTasks}/>
      </div>
    </div>
  );
}
