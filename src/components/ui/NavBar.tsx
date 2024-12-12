import Link from "next/link";
import { Link as LinkType } from "@customtypes/link";
import { pages } from "@config/index";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { FaDiscord, FaTelegram, FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useScreenWidth } from "@hooks/useScreenWidth";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
    <div
      className=" relative"
      style={{
        zIndex: "10000",
      }}
    >
      <div
        className={`flex h-[86px]  px-4 md:px-8 w-full items-center justify-between text-white ${
          visibleMenu ? "bg-foreground" : ""
        } `}
      >
        <Link href={"/"}>
          <Image
            src="/images/logo.svg"
            alt=""
            width={500}
            height={500}
            className="w-[220px] h-auto"
          />
        </Link>
        <div className=" gap-4 xl:gap-10  lg:flex hidden">
          <div className="flex gap-4 xl:gap-10 text-md ">
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
            <Button type="dark" size="sm" rounded>
              <FaTelegramPlane className="  text-2xl" />
            </Button>
            <Button type="dark" size="sm" rounded>
              <FaDiscord className="  text-2xl" />
            </Button>
            <Button type="dark" size="sm" rounded>
              <BsTwitterX className="  text-2xl" />
            </Button>

            <ConnectButton />
          </div>
        </div>

        <Button
          onClick={() => setVisibleMenu((prev) => !prev)}
          type="dark"
          className="lg:hidden block"
          size="sm"
          rounded
        >
          {visibleMenu ? (
            <IoMdClose className="  text-2xl" />
          ) : (
            <IoIosMenu className="  text-2xl" />
          )}
        </Button>
      </div>
      {visibleMenu && (
        <div className="flex flex-col gap-4 text-md w-screen   p-4 bg-black h-screen">
          {pages.map((link: LinkType, id) => (
            <Link
              key={id}
              href={link.path}
              className="flex  items-center"
              target={link.target}
            >
              <Button type="dark" className="w-full" rounded size="lg">
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
            <Button type="dark" size="sm" rounded>
              <FaTelegramPlane />
            </Button>
            <Button type="dark" size="sm" rounded>
              <FaDiscord />
            </Button>
            <Button type="dark" size="sm" rounded>
              <BsTwitterX />
            </Button>
          </div>
          <div className=" w-fit mx-auto">
            <ConnectButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
