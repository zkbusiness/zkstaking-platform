import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

type CopierProps = {
    copyString: string;
    isLink?: boolean;
    reduce?: boolean;
    text: string;
};

export default function Copier({ copyString, isLink = false, reduce = false, text }: CopierProps) {
    const [copied, setCopied] = useState<boolean>(false);
    const displayText = reduce && text.length > 20 ? text.slice(0, 10) + "..." + text.slice(-10) : text;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text", err);
        }
    };

    return (
        <div className="flex items-center gap-2 justify-center">
            {isLink ? (
                <a href={copyString} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    {displayText}
                </a>
            ) : (
                <span>{displayText}</span>
            )}
            {copied ? (
                <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
                <FaCopy className="w-4 h-4 cursor-pointer text-gray-500" onClick={handleCopy} />
            )}
        </div>
    );
}