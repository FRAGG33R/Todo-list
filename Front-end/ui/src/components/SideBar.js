import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { IconPlus, IconX, IconLogout } from "@tabler/icons-react";
import axios from "axios";
import Modal from "./Modal";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import DropDown from "./DropDown";

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
  const [tasks, setTasks] = useState([]);
  const [avatar, setAvatar] = useState(false);
  const [modal, setModal] = useState({
    title: "Create To-do list",
    description: "Create To-do list",
    state: false,
    button: "Add",
  });
  const { logout } = useAuth0();

  const fetching = async () => {
    await axios
      .post("http://localhost:3001/app", {
        name: user.nickname,
        email: user.email,
      })
      .then(function (res) {})
      .catch(function () {
        console.log("Network error");
      });
    await axios
      .post("http://localhost:3001/app/todos", {
        email: user.email,
      })
      .then(function (res) {
        setToDos(res.data);
		if(toDos.length === 0)
			setOpen(true);
      })
      .catch(function () {
        console.log("Network error");
      });
  };
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetching();
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
    <div className="overflow-x-hidden">
      <div className="h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
        {!open && (
          <button
            className="h-12 w-12 px-2 fixed items-center justify-center py-2 text-base font-normal leading-6 text-[#16433a] hover:text-[#286256] whitespace-no-wrap focus:outline-none focus:shadow-none"
            onClick={() => {
              if (!open) setOpen(true);
              else setOpen(false);
            }}
          >
            {" "}
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        {open && (
          <div className=" fixed z-30 flex flex-col w-64  h-full  overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#16433a] scrollbar-track-[#1d5d51] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full  bg-[#1c5d51] rounded-br-xl rounded-tr-xl">
            <div className="w-full flex items-center justify-between flex-row px-2 pt-1 ">
              <div className="mb-1 w-10 h-10">
                <button
                  onClick={() => {
                    if (avatar) setAvatar(false);
                    else setAvatar(true);
                  }}
                  class="text-white focus:outline-none rounded-lg inline-flex items-center "
                  type="button"
                >
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={user?.picture}
                    alt=""
                  />
                </button>
                {avatar ? (
                  <div
                    id="dropdown"
                    class="fixed z-50 bg-white  rounded-lg shadow  hover:bg-[#e0e1e1]"
                  >
                    <ul
                      class="text-sm text-gray-900 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <button
                          onClick={() => {
                            logout({ logoutParams: { returnTo: window.location.origin } });
                          }}
                          href="#"
                          class="flex items-center justify-center w-full space-x-2 px-2 py-2 "
                        >
                          <div> Sign Out</div>
                          <IconLogout />
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="font-rubik tracking-wider text-white">{`Hi, ${
                user.nickname < 6
                  ? user.nickname
                  : user.nickname.substring(0, 6) + "..."
              } 👋`}</div>
              {open && (
                <button
                  className="text-white hover:text-white/80 pt-1"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <IconX />
                </button>
              )}
            </div>
            <div className="w-full border border-white"></div>
            <ul className="flex pl-3 flex-col space-y-4 py-4 w-full">
              {toDos.length > 0 &&
                toDos.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setDisplayedTasks(item.id);
                    }}
                  >
                    <DropDown
                      tasks={tasks}
                      setTasks={setTasks}
                      name={
                        item.name.length < 16
                          ? item.name
                          : item.name.substr(0, 16) + "..."
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
                className="self-center flex items-center justify-center w-[40px] h-[40px] font-normal bg-[#113932] hover:bg-[#1a5047] rounded-full "
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
        <App
          image={user?.picture}
          id={displayedTasks}
          tasks={tasks}
          setTasks={setTasks}
          Open={open}
        />
      </div>
    </div>
  );
}
