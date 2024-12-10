import { ReactNode, MouseEventHandler } from "react";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "default" | "primary" | "secondary" | "danger" | "dark";
  className?: string;
  rounded?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "default",
  className = "",
  rounded = false,
}: Props) => {
  // Define class mappings
  const buttonClass = {
    default: "bg-default text-black", // Uses custom "default" color
    primary: "bg-primary text-white", // Uses custom "primary" color
    secondary: "bg-secondary text-white", // Uses custom "secondary" color
    danger: "bg-danger text-white", // Uses custom "danger" color
    dark: "bg-white px-4 py-4  h-auto text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-between",
  };

  return (
    <button
      onClick={onClick}
      className={`${className} px-16 h-16 rounded-full flex items-center justify-center  ${buttonClass[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
