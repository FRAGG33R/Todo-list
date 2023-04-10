import { useEffect, useState } from "react";
import {
  IconPlus,
  IconTrash,
  IconCircle,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Reorder } from "framer-motion";

export default function App(props) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [checkedTask, setCheckedTask] = useState([]);

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
  const fetchTasks = async () => {
    await axios
      .get("http://localhost:3001/app/list", { params: { id: props.id } })
      .then(function (res) {
        props.setTasks(res.data);
      })
      .catch(function () {
        console.log("crash");
      });
  };
  useEffect(() => {
    fetchTasks();
  }, [props.id]);

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
          fetchTasks();
        }
      })
      .catch(function () {
        setError(true);
        errorNofity();
      });
    setInputValue("");
  };

  const removeTask = (id) => {
    axios
      .delete("http://localhost:3001/app/list", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        props.setTasks(res.data);
		const index = checkedTask?.indexOf(id);
		if (index !== -1)
		{
			const newCheckedTask = [
			...checkedTask.slice(0, index),
			...checkedTask.slice(index + 1),
			];
			setCheckedTask(newCheckedTask);
		}
      })
      .catch(() => {
        console.log("Crash");
      });
  };
  const checkTask = (id) => {
    const index = checkedTask?.indexOf(id);
    if (index !== -1)
	{
      const newCheckedTask = [
        ...checkedTask.slice(0, index),
        ...checkedTask.slice(index + 1),
      ];
      setCheckedTask(newCheckedTask);
    }
	else
	{
      const newCheckedTask = [...checkedTask, id];
      setCheckedTask(newCheckedTask);
    }
  };
  return (
    <>
      {props.Open && (
        <div className="w-screen h-screen fixed bg-black opacity-80 z-10"></div>
      )}
      <div className="w-screen h-screen flex flex-col items-center xs:space-y-6 md:space-y-16 justify-end bg-[#85ceb9] font-rubik font-normal tracking-widest">
        <Toaster />
        <div className="xs:w-10/12 md:w-7/12 h-[80vh]  overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#16433a] scrollbar-track-[#1d5d51] scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
          <Reorder.Group
            axis="y"
            values={props.tasks}
            onReorder={props.setTasks}
            className="space-y-4 h-full w-full flex justify-start flex-col"
          >
            {props.tasks.map((item) => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="w-11/12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {checkedTask?.includes(item.id) ? (
                  <div className="bg-[#0a2620] text-white w-full flex flex-col rounded-xl shadow-lg p-4 hover:bg-[#051613] opacity-60">
                    <div className="flex items-center justify-between w-full">
                      <div
                        onClick={() => {
                          checkTask(item.id);
                        }}
                      >
                        <IconCircleCheckFilled size={22} />
                      </div>
                      <div className="flex space-x-4 lg:w-10/12 xs:w-8/12 overflow-hidden h-[3vh] ">
                        <div className="text-md w-full overflow-hidden  decoration-gray-200 line-through opacity-90">
                          {item.content}
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <div className="cursor-pointer">
                          <img
                            className="w-5 h-5 rounded-lg"
                            src={props.image}
                          />
                        </div>
                        <button
                          onClick={() => {
                            removeTask(item.id);
                          }}
                          className="flex items-center justify-center text-white cursor-pointer"
                        >
                          <IconTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#16433a] text-white w-full flex flex-col rounded-xl shadow-lg p-4 hover:bg-[#10362f]">
                    <div className="flex items-center justify-between w-full">
                      <div
                        onClick={() => {
                          checkTask(item.id);
                        }}
                      >
                        {checkedTask?.includes(item.id) ? (
                          <IconCircleCheckFilled size={22} />
                        ) : (
                          <IconCircle size={22} />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 lg:w-10/12 xs:w-8/12 overflow-hidden">
                        <div className="text-md w-full">{item.content}</div>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <div className="cursor-pointer">
                          <img
                            className="w-5 h-5 rounded-lg"
                            src={props.image}
                          />
                        </div>
                        <button
                          onClick={() => {
                            removeTask(item.id);
                          }}
                          className="flex items-center justify-center text-white cursor-pointer"
                        >
                          <IconTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="w-full  flex justify-center pb-6 ">
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
    </>
  );
}
