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
  onToggle = () => {},
  isExpended = false,
}: Prop) => {
  return (
    <div className="flex flex-col ">
      <div
        onClick={onToggle}
        className={`flex xs:px-10   xs:py-8 p-4 rounded-2xl xs:rounded-3xl       relative border-[1px] 
          animated-element gap-8 ${
            isExpended
              ? "bg-[#1755F4] hover:bg-[#4772df] border-transparent"
              : "bg-[#3D424D80]  hover:bg-gray-800 border-gray-600"
          }`}
      >
        <Image
          src={icon}
          draggable="false"
          alt=""
          width={100}
          height={100}
          className="w-14 h-14 aspect-square rounded-full hidden sm:block"
        />
        <div>
          <h4 className={`xs:text-2xl  text-xl font-semibold text-white`}>
            {title}
          </h4>
          <div className=" text-gray-300">{description}</div>
        </div>
        <div className="w-4"></div>
        <MdKeyboardArrowUp
          className={` transition duration-150 absolute  right-2 xs:right-8 
            top-1/2 -translate-y-1/2 w-10 h-10 text-gray-300  ${
              isExpended ? "rotate-0" : "rotate-180"
            } `}
        />
      </div>
      <div
        className={`bg-[#3D424D80]  transition duration-150  border-gray-600  rounded-2xl overflow-hidden 
            xs:rounded-3xl
           whitespace-pre-line
           xs:px-10
          animated-element  ${
            isExpended
              ? "    xs:py-8 p-4   mt-4"
              : " h-0 py-0 xs:py-0  mt-0 rounded-none"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

export default FaqCard;
