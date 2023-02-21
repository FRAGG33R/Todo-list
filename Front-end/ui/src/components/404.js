import Image from '../assets/404.png'

export default function PageNotFound() 
{
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-[#85ceb9]">
			<img src={Image} />
		</div>
	)
}