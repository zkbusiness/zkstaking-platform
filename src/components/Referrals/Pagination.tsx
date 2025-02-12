import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const maxVisiblePages = 5;
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("ellipsis");
            pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1);
            pageNumbers.push("ellipsis");
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push("ellipsis");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("ellipsis");
            pageNumbers.push(totalPages);
        }
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <button className="bg-white  text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-center p-1 rounded-md aspect-square w-8 flex items-center disabled:cursor-not-allowed disabled:bg-opacity-5" onClick={() => onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 0)} disabled={currentPage === 1}>
                <FaArrowLeft />
            </button>
            {pageNumbers.map((pageNumber, index) => (
                <button
                    className={`bg-white  text-md bg-opacity-10 hover:bg-opacity-15 text-white justify-between p-0 aspect-square w-8 rounded-md ${currentPage === pageNumber ? "border border-gray-300" : ""}`}
                    key={index}
                    onClick={() => typeof pageNumber === "number" && onPageChange(pageNumber)}
                    disabled={pageNumber === "ellipsis"}
                >
                    {pageNumber === "ellipsis" ? "..." : pageNumber}
                </button>
            ))}
            <button
                className="bg-white  text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-center p-1 rounded-md aspect-square w-8 flex items-center disabled:cursor-not-allowed disabled:bg-opacity-5"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaArrowRight />
            </button>
        </div>
    );
}

