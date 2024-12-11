import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className=" backdrop-blur-sm fixed top-0 left-0 z-50 w-full h-full bg-[#0000007a]"
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
          onClick={handleClose}
        >
          <motion.div
            className="w-full  max-w-[440px] h-full max-h-[400px] border-[1px] border-gray-600  bg-[#1C1C1C] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            variants={containerVariant}
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "24px",
                top: "24px",
                cursor: "pointer",
              }}
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
            >
              <title>close</title>
              <line
                x1="19.39"
                y1="19.39"
                x2="1"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="19.39"
                x2="19.39"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </svg>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
