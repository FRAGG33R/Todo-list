import { useEffect, useState } from "react";
import { IconPlus, IconPin  } from "@tabler/icons-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function App(props) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false); 

  const testTodos = [
    { content: "Lorem ipsum dolor sit amet" },
    { content: "Consectetur adipiscing elit" },
    { content: "Sed do eiusmod tempor incididunt" },
    { content: "Ut labore et dolore magna aliqua" },
    { content: "Ut enim ad minim veniam" },
    { content: "Quis nostrud exercitation ullamco laboris" },
    { content: "Nisi ut aliquip ex ea commodo consequat" },
    { content: "Duis aute irure dolor in reprehenderit" },
    { content: "Voluptate velit esse cillum dolore" },
    { content: "Eu fugiat nulla pariatur" },
  ];

  const success = () =>
    toast("One more thing to do!", {
      duration: 1400,
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#1c5d51",
        fontWeight: "300",
        color: "#fff",
      },
    });

  const errorNofity = () =>
    toast.error("Task creation failed.", {
      duration: 1400,
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#1c5d51",
        fontWeight: "300",
        color: "#fff",
      },
    });

  // useEffect(() => {
  //   console.log("useEffect are executer again !");
  //   axios
  //     .get("http://localhost:3001/app/list", { params: { id: props.id } })
  //     .then(function (res) {
  //       console.log(res);
  //     })
  //     .catch(function (err) {
  //       console.log("crash");
  //     });
  // }, [props.id]);

  const changeForm = (event) => {
    setError(false);
    setInputValue(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/app/list", { inputValue, id: props.id })
      .then(function (res) {
        if (res.status === 200) {
          setError(false);
          success();
        }
      })
      .catch(function () {
        setError(true);
        errorNofity();
      });
    setInputValue("");
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center xs:space-y-6 md:space-y-16 justify-end bg-[#85ceb9] font-rubik font-normal tracking-widest">
      <Toaster />
      <div className="xs:w-10/12 md:w-7/12 h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#16433a] scrollbar-track-[#1d5d51] scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
        <ul className="space-y-4 h-full w-full">
          {testTodos.map((item) => (
            <li className="w-full flex justify-start">
              <div
			  	class="bg-[#16433a] text-white w-10/12 flex flex-col rounded-xl shadow-lg p-4"
			>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="rounded-full w-4 h-4 border border-purple-500"></div>
                    <div class="text-md w-11/12">{item.content}</div>
                  </div>
                  <div class="flex items-center space-x-4  w-[6vw]">
                    <div class="cursor-pointer">
                      <img
                        class="w-5 h-5 rounded-lg"
                        src={props.image}
                      />
                    </div>
                    <div class="text-gray-500 hover:text-gray-300 cursor-pointer">
                      <IconPin />
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-gray-500 font-bold text-sm"># TODO</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex justify-center pb-6 ">
        <form className="relative xs:w-11/12 md:w-7/12" onSubmit={submitForm}>
          <input
            type="text"
            value={inputValue}
            onChange={changeForm}
            placeholder="Add Task"
            className={
              error == true
                ? "w-full border-[2.4px] bg-transparent shadow-lg shadow-[#5d8a7f] border-[#FF4B4B] rounded-lg py-2 pl-9 placeholder-[#FF4B4B] text-gray-900 focus:border-[#FF4B4B] focus:ring-0"
                : "w-full border-[2.4px] bg-transparent shadow-lg shadow-[#5d8a7f] border-[#1c5d51] rounded-lg py-2 pl-9 placeholder-[#1c5d51] text-gray-900 focus:border-[#1c5d51]  focus:ring-0"
            }
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <IconPlus color={error == true ? "#FF4B4B" : "#1c5d51"} />
          </div>
        </form>
      </div>
    </div>
  );
}
