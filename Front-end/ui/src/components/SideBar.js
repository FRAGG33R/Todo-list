import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { IconNotes, IconPlus } from "@tabler/icons-react";
import Modal from './Modal'
export default function SideBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [toDos, setToDos] = useState([]);
  const [modal, setModal] = useState({title : "add", description : "control your life", state : false , button : "Add"});

  function createToDo() {
    setToDos((prev) => [...prev, { title: "todo item" }]);
  }

  if (isLoading) return <h1>loading ...</h1>;
  else if (!isLoading && !isAuthenticated) return <Navigate to="/" />;
  else
    return (
      <div class="contianer h-screen flex flex-row bg-[#85ceb9] font-rubik tracking-wider">
        <div class="flex flex-col w-56 overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-[#16433a] scrollbar-track-[#1c5d51] drop-shadow-2xl bg-[#1c5d51]">
          <div class="relative w-full pt-4 flex items-center justify-center ">
            <img class="w-10 h-10 rounded-full" src={user?.picture} alt="" />
          </div>
          <ul class="flex pl-3 flex-col space-y-4 py-4">
            {toDos.map((item) => (
              <li>
                <a
                  href="#_"
                  class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
                >
                  <IconNotes height={18} color="white" stroke-width="1.25" />
                  <span class="text-sm font-medium pl-1">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              createToDo();
				// setModal({title : "add", description : "control your life", state : true , button : "Add"})
            }}
            href="#_"
            class="self-center flex items-center justify-center w-[40px] h-[40px] font-medium bg-[#113932] hover:bg-[#1a5047] rounded-full "
          >
            <IconPlus color="white" />
          </button>
			{/* <Modal state={modal.state}  title={modal.title} description={modal.description} utton={modal.button}/> */}

		  {/*  */}
        </div>
        <App />
      </div>
    );
}
