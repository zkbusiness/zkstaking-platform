import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
};
const containerVariant = {
    initial: { top: "-50%", transition: { type: "spring" } },
    isOpen: { top: "50%" },
    exit: { top: "-50%" },
};
export const Modal = ({ handleClose, children, isOpen }: any) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className=" backdrop-blur-sm fixed top-0 left-0 z-[100000] w-full h-full bg-[#0000007f]"
                    initial={"initial"}
                    animate={"isOpen"}
                    exit={"exit"}
                    variants={modalVariant}
                    onClick={handleClose}
                >
                    <motion.div
                        className="w-full  max-w-[440px] h-full max-h-[400px] border-[1px] border-white  bg-[#ffffff36] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 "
                        variants={containerVariant}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoMdClose
                            className=" text-3xl absolute right-6 top-6"
                            onClick={handleClose}
                        />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
