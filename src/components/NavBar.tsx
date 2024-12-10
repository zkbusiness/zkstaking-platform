import Link from "next/link";
import { Link as LinkType } from "../types/link";
import { pages } from "../config/links";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useScreenWidth } from "../hooks/useScreenWidth";

const NavBar = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const isNarrowScreen = useScreenWidth();

  useEffect(() => {
    if (visibleMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [visibleMenu]);

  useEffect(() => {
    if (!isNarrowScreen && visibleMenu) setVisibleMenu(false);
  }, [isNarrowScreen]);

  return (
    <div>
      <div
        className={`flex h-[86px]  px-4 md:px-8 items-center justify-between text-white ${
          visibleMenu ? "bg-foreground" : ""
        } `}
      >
        <Image
          src="/logo.webp"
          alt=""
          width={500}
          height={500}
          className="w-[220px] h-auto"
        />
        <div className=" gap-10 lg:flex hidden">
          <div className="flex gap-10 text-md ">
            {pages.map((link: LinkType, id) => (
              <Link
                key={id}
                href={link.path}
                className="flex  items-center font-[400]  space-x-2"
                target={link.target}
              >
                {link.name}

                {link?.target === "blank" && (
                  <>
                    &nbsp;
                    <LiaExternalLinkAltSolid />
                  </>
                )}
              </Link>
            ))}
          </div>
          <div className=" flex items-center gap-2">
            <Button type="dark">
              <FaDiscord className="  text-2xl" />
            </Button>
            <Button type="dark">
              <BsTwitterX className="  text-2xl" />
            </Button>
            <Button type="dark" className="  text-2xl">
              <Image
                src="/lens-protocol.svg"
                alt="lens"
                width={24}
                height={24}
              />
            </Button>
            <Button type="dark" className="  text-2xl">
              <Image src="/mirror.svg" alt="mirror" width={24} height={24} />
            </Button>
          </div>
        </div>

        <Button
          onClick={() => setVisibleMenu((prev) => !prev)}
          type="dark"
          className="lg:hidden block"
        >
          {visibleMenu ? (
            <IoMdClose className="  text-2xl" />
          ) : (
            <IoIosMenu className="  text-2xl" />
          )}
        </Button>
      </div>
      {visibleMenu && (
        <div className="flex flex-col gap-4 text-md   p-4 bg-black h-screen">
          {pages.map((link: LinkType, id) => (
            <Link
              key={id}
              href={link.path}
              className="flex  items-center"
              target={link.target}
            >
              <Button type="dark" className="w-full">
                {link.name}

                {link?.target === "blank" && (
                  <>
                    &nbsp;
                    <LiaExternalLinkAltSolid className="text-2xl" />
                  </>
                )}
              </Button>
            </Link>
          ))}
          <div className=" flex items-center gap-2 justify-center">
            <Button type="dark">
              <FaDiscord />
            </Button>
            <Button type="dark">
              <BsTwitterX />
            </Button>
            <Button type="dark">
              <Image
                src="/lens-protocol.svg"
                alt="lens"
                width={20}
                height={20}
              />
            </Button>
            <Button type="dark">
              <Image src="/mirror.svg" alt="mirror" width={20} height={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
