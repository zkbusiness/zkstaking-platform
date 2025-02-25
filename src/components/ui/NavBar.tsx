import Link from "next/link";
import { Link as LinkType } from "@customtypes/link";
import { pages } from "@config/index";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useScreenWidth } from "@hooks/useScreenWidth";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Avatar } from "./Avatar";
import { useUserInfo } from "@contexts/UserInfoContext";

const NavBar = () => {
    const { userInfo } = useUserInfo();
    const [visibleMenu, setVisibleMenu] = useState(false);
    const isNarrowScreen = useScreenWidth();
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    useEffect(() => {
        if (visibleMenu) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [visibleMenu]);

    useEffect(() => {
        if (!isNarrowScreen && visibleMenu) setVisibleMenu(false);
    }, [isNarrowScreen]);

    return (
        <div
            className=" relative "
            style={{
                zIndex: "10000",
            }}
        >
            <div
                className={`flex h-[86px]  px-4 md:px-8 w-full items-center justify-between text-white  ${visibleMenu ? "bg-foreground" : ""
                    } `}
            >
                <Link href={"/"}>
                    <Image
                        draggable="false"
                        src="/images/logo.png"
                        alt="Go to home"
                        width={220}
                        height={57}
                        className="w-[220px] h-auto"
                    />
                </Link>
                <div className=" gap-4 xl:gap-10  lg:flex hidden">
                    <div className="flex gap-4 xl:gap-10 text-md ">
                        {pages.map((link: LinkType, id) => (
                            <Link
                                key={id}
                                href={link.path}
                                className="flex items-center font-[400]  space-x-2"
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
                        <Link href="https://t.me/zkBusinessOffcial" target="blank" >
                            <Button type="dark" size="sm" aria-label="Telegram" rounded>
                                <FaTelegramPlane className="  text-2xl" />
                            </Button>
                        </Link>
                        <Link href="https://discord.gg/CVFsSXRqZ6" target="blank" >
                            <Button type="dark" size="sm" aria-label="Discord" rounded>
                                <FaDiscord className="text-2xl" />
                            </Button>
                        </Link>
                        <Link href="https://x.com/zkbusinessland" target="blank" >
                            <Button type="dark" size="sm" aria-label="Twitter" rounded>
                                <BsTwitterX className="  text-2xl" />
                            </Button>
                        </Link>
                        <ConnectButton />
                        {isConnected && <Link href="/profile"><Avatar src={userInfo.avatarUrl} size="sm" /></Link>}
                    </div>
                </div>

                <Button
                    aria-label="Menu"
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
                <div className="flex flex-col gap-4 text-md w-screen p-4 bg-black h-screen">
                    {pages.map((link: LinkType, id) => (
                        <Link
                            onClick={() => setVisibleMenu(() => false)}
                            key={id}
                            href={link.path}
                            className="flex items-center"
                            target={link.target}
                        >
                            <Button type="dark" aria-label={link.name} className="w-full justify-center" rounded size="lg">
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
                        <Link href="https://t.me/zkBusinessOffcial" target="blank" >
                            <Button
                                aria-label="Telegram"
                                type="dark"
                                size="sm"
                                rounded
                                onClick={() => {
                                    setVisibleMenu(() => false);
                                }}
                            >
                                <FaTelegramPlane />
                            </Button>
                        </Link>
                        <Link href="https://discord.gg/CVFsSXRqZ6" target="blank" >
                            <Button
                                aria-label="Discord"
                                type="dark"
                                size="sm"
                                rounded
                                onClick={() => {
                                    setVisibleMenu(() => false);
                                }}
                            >
                                <FaDiscord />
                            </Button>
                        </Link>
                        <Link href="https://x.com/zkbusinessland" target="blank" >
                            <Button
                                aria-label="Twitter"
                                type="dark"
                                size="sm"
                                rounded
                                onClick={() => {
                                    setVisibleMenu(() => false);
                                }}
                            >
                                <BsTwitterX />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex gap-2 w-fit mx-auto items-center">
                        <ConnectButton />{isConnected && <Link href="/profile" onClick={() => {
                            setVisibleMenu(() => false);
                        }}><Avatar src={userInfo.avatarUrl} size="xs" /></Link>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
