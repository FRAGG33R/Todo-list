import { useEffect, useState } from "react";
import { IconPlus } from '@tabler/icons-react';
import axios from "axios";
export default function App(props) {
  // const [res, setRes] = useState([]);
  useEffect(() => {
    console.log("useEffect are executer again !");
    axios
      .get("http://localhost:3001/app/list", { params: { id: props.id } })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log("crash");
      });
  }, [props.id]);
  return (
    <div className="w-screen h-screen flex items-end justify-center bg-[#85ceb9] font-rubik">
      <div className="w-full flex justify-center pb-6">
        <div class="relative w-9/12">
          <input
            type="text"
            placeholder="Add Task"
            class="w-full border-[2.4px] bg-transparent border-gray-600 rounded-lg py-2 pl-10 placeholder-gray-600 text-gray-600 focus:border-gray-600 focus:ring-0"
          />
          <div class="absolute inset-y-0 left-0 flex items-center pl-2">
            <IconPlus color="#4B5563"/>
          </div>
        </div>
      </div>
    </div>
  );
}
//old one
{
  /* <div className="w-full flex justify-center pb-6">
	<input
		type="text"
		id="small-input"
		placeholder="Add Task"
		class="block w-9/12 p-2.5 text-gray-600 border-[2.4px] border-gray-600 rounded-lg bg-transparent sm:text-sm placeholder:text-gray-600 placeholder:font-rubik focus:ring-blue-500 focus:border-blue-500"
	/>
</div> */
}
