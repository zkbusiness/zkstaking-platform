import { cn } from "@utils/index";
import { useState } from "react";

interface Option {
    label: string;
    value: string | number;
}

const Select = ({
    options,
    className,
    style,
    defaultValue,
    onChange = () => {},
}: {
    options: Option[];
    className?: string;
    style?: any;
    defaultValue?: string;
    onChange?: (value: string) => void;
}) => {
    const [selectedOption, setSelectedOption] = useState<Option>(
        defaultValue
            ? options.filter((v) => v.value === defaultValue)[0]
            : options[0]
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(`${option.value}`);
    };

    return (
        <div className={cn("relative w-64", className)} style={style || {}}>
            <div
                className="cursor-pointer border bg-[#1A1A1A] border-gray-300 rounded-lg p-2 flex justify-between items-center"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span>
                    {selectedOption ? selectedOption.label : "Select a flavor"}
                </span>
                <span
                    className={`transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                >
                    ▼
                </span>
            </div>
            {isOpen && (
                <div className="absolute z-10  w-full py-2  bg-[#1A1A1A] rounded-lg shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="cursor-pointer p-2 hover:bg-gray-800"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
