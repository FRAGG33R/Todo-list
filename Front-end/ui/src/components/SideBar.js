import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { IconNotes, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import Modal from "./Modal";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast.error("Oops! That name already exists.", {
    style: {
      borderRadius: "50px",
      color: "#1c5d51",
    },
  });

export default withAuthenticationRequired(SideBar, {
  onRedirecting: () => <Redirect />,
});

function Redirect() {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
          console.log(res);
          setToDos(res.data);
        })
        .catch(function () {
          console.log("Network error");
        });
    }
  }, [isAuthenticated]);
  function createToDo(tempName) {
    if (tempName) {
      setToDos((prev) => [...prev, { name: tempName }]);
      setModal({
        title: "Create To-do list",
        description: "Create To-do list",
        state: false,
        button: "Add",
      });
    } else {
      notify();
    }
  }
  return (
    <div>
      <div className="contianer h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
        <Toaster position="top-right" reverseOrder={true} />
        <div className="flex flex-col w-56 overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-[#16433a] scrollbar-track-[#1c5d51] drop-shadow-2xl bg-[#1c5d51]">
          <div className="relative w-full pt-4 flex items-center justify-center ">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.picture}
              alt=""
            />
          </div>
          <ul className="flex pl-3 flex-col space-y-4 py-4">
            {toDos.map((item) => (
              <li>
                <a
                  href="#_"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
                >
                  <IconNotes height={18} color="white" strokeWidth="1.25" />
                  <span className="text-sm font-medium pl-1">
                    {item.name.length < 15
                      ? item.name
                      : item.name.substr(0, 15) + "..."}
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
          <Modal
            state={modal.state}
            title={modal.title}
            description={modal.description}
            button={modal.button}
            email={user.email}
            add={createToDo}
          />
        </div>
        <App />
      </div>
    </div>
  );
}
