import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconPuzzle } from "@tabler/icons-react";
import axios from "axios";

export default function Example(props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/", {
        name,
		email : props.email
      })
      .then(function (res)  {
		props.add(res.data.name, res.data.id)
      })
      .catch(function (err) {
        console.log("Network error 1");
      });
  };

  useEffect(() => {
    setOpen(props.state);
  }, [props]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <IconPuzzle color="green" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {props?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full p-0 m-0 pl-3">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full h-full flex items-start justify-start flex-col"
                  >
                    <div className="mb-6 w-full ">
                      <input
                        type="text"
                        id="name"
                        className="ml-3 bg-gray-50 border border-green-900 text-gray-900 text-sm rounded-full focus:ring-[#1c5d51] focus:border-[#1c5d51] block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1c5d51] dark:focus:border-[#1c5d51]"
                        placeholder="Todo list name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="self-end mb-3 mr-3 inline-flex w-full justify-center rounded-full border border-transparent bg-[#1c5d51] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#147157] focus:outline-none focus:ring-2 focus:ring-[#1c5d51] focus:ring-offset-2  sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      {props?.button}
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
