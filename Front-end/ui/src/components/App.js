import { useEffect, useState } from "react";
import { IconPlus } from '@tabler/icons-react';
import axios from "axios";
export default function App(props) {

//   useEffect(() => {
//     console.log("useEffect are executer again !");
//     axios
//       .get("http://localhost:3001/app/list", { params: { id: props.id } })
//       .then(function (res) {
//         console.log(res);
//       })
//       .catch(function (err) {
//         console.log("crash");
//       });
//   }, [props.id]);

  const submitForm = () => {
	console.log("form submitted successfuly !");
  }
  return (
    <div className="w-screen h-screen flex items-end justify-center bg-[#85ceb9] font-rubik">
      <div className="w-full flex justify-center pb-6">
        <form className="relative w-9/12" onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Add Task"
            className="w-full border-[2.4px] bg-transparent shadow-lg shadow-[#5d8a7f] border-[#1c5d51] rounded-lg py-2 pl-9 placeholder-[#1c5d51] text-gray-900 focus:border-[#1c5d51]  focus:ring-0"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <IconPlus color="#1c5d51"/>
          </div>
        </form>
      </div>
    </div>
  );
}
