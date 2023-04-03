import { useEffect, useState } from "react";
import axios from "axios";
export default function App(props)
{
	const [res, setRes] = useState([]);
	useEffect(() => {
		console.log("useEffect are executer again !");
		axios
        .get("http://localhost:3001/app/list", {params : {id : props.id}})
        .then(function (res) {
			console.log(res);
			setRes(res)})
        .catch(function (err) {
			console.log("crash")
          console.log("Network error", err);
        });
	}, [props.id]);
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-[#85ceb9]">
		</div>
	)
}