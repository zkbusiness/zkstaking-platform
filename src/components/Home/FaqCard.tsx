import { ReactElement } from "react";
import Image from "next/image";
import { MdArrowBackIos, MdKeyboardArrowUp } from "react-icons/md";

interface Prop {
	children: ReactElement | string;
	title: string;
	description: string;
	icon: string;
	isExpended?: boolean;
	onToggle?: () => void;
}

const FaqCard = ({
	children,
	title,
	description,
	icon,
	onToggle = () => { },
	isExpended = false,
}: Prop) => {
	return (
		<div className="flex flex-col ">
			<div
				onClick={onToggle}
				className={`flex px-10   py-8      relative border-[1px] 
         rounded-3xl  animated-element gap-8 ${isExpended
						? "bg-[#1755F4] hover:bg-[#4772df] border-transparent"
						: "bg-[#3D424D80]  hover:bg-gray-800 border-gray-600"
					}`}
			>
				<Image
					src={icon}
					draggable="false"
					alt=""
					width={30}
					height={30}
					className="w-14 h-14 aspect-square rounded-full hidden sm:block"
				/>
				<div>
					<h4 className={`text-2xl  font-semibold text-white`}>
						{title}
					</h4>
					<div className=" text-gray-300">{description}</div>
				</div>
				<div className="w-4"></div>
				<MdKeyboardArrowUp
					className={` transition duration-150 absolute right-8 
            top-1/2 -translate-y-1/2 w-10 h-10 text-gray-300  ${isExpended ? "rotate-0" : "rotate-180"
						} `}
				/>
			</div>
			<div
				className={`bg-[#3D424D80]  transition duration-150  border-gray-600  rounded-3xl overflow-hidden 
          px-10
           whitespace-pre-line
          animated-element  ${isExpended ? " py-8   mt-4" : " h-0 py-0  mt-0 rounded-none"
					}`}
			>
				{children}
			</div>
		</div>
	);
};

export default FaqCard;
