import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { ConfirmBox } from "@components/Stake/confirmBox";
import { useStakeContext } from "@contexts/StakeContext";
import numeral from "numeral";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import Button from "@components/ui/Button";
import VideoBackgroundWrapper from "@components/ui/VIdeoWrapper";
import { CountUp } from "@components/ui/CountUp";
import CoinSpinner from "@components/ui/CoinSpinner";

const StakeLayout: NextPage = () => {
    const {
        stakeInfo: { rewards, zkPrice, balance, hasStake, stakeShare, aprRate, totalStaked, totalStaker },
    } = useStakeContext();

    const { isConnected } = useAccount();

    const [pageText, setPageText] = useState("Stake");
    const [isOpen, toggle] = useState(false);
    const [isVideoLoaded, setVideoLoaded] = useState(false);
    const [modalType, setModalType] = useState<
        "stake" | "unstake" | "claim" | ""
    >("");

    const [checkStakeValue, setCheckStakeValue] = useState<boolean>(true);
    const [checkUnstakeValue, setCheckUnstakeValue] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(0);

    function handlOpenModal(
        open: boolean,
        type: "stake" | "unstake" | "claim" | ""
    ) {
        toggle(open);
        setModalType(type);
    }

    const stakeHandle = () => {
        if (!amount || amount <= 0) {
            toast.warning("Enter stake amount");
            return;
        }
        handlOpenModal(true, "stake");
    };

    const unstakeHandle = () => {
        if (!amount || amount <= 0) {
            toast.warning("Enter stake amount");
            return;
        }
        handlOpenModal(true, "unstake");
    };

    const claimHandle = () => {
        handlOpenModal(true, "claim");
    };

    const handleChange = (event: any) => {
        if (pageText == "Stake") {
            if (balance < event.target.value) {
                setCheckStakeValue(false);
            } else {
                setCheckStakeValue(true);
            }
        }
        if (pageText == "Unstake" && stakeShare < event.target.value) {
            if (stakeShare < event.target.value) {
                setCheckUnstakeValue(false);
            } else {
                setCheckUnstakeValue(true);
            }
        }

        const value = parseInt(event.target.value, 0);
        if (!isNaN(value)) {
            setAmount(value);
        }
        if (event.target.value == 0) {
            setAmount(value);
        }
    };

    const changeStakeInput = (percent: number) => {
        if (pageText == "Stake") {
            if (balance) {
                const value = parseInt(String(balance * (percent / 100)), 10);
                if (!isNaN(value)) {
                    setAmount(value);
                }
                if (balance < value) setCheckStakeValue(false);
                else setCheckStakeValue(true);
            }
        } else {
            if (stakeShare) {
                const value = parseInt(String(stakeShare * (percent / 100)), 10);
                if (!isNaN(value)) {
                    setAmount(value);
                }
                if (stakeShare < value) setCheckUnstakeValue(false);
                else setCheckUnstakeValue(true);
            }
        }
    };

    const clickTap = (text: string) => {
        setPageText(text);
    };

    useEffect(() => {
        setAmount(0);
    }, [pageText]);

    return (
        <div className="  relative -top-24  ">
            <VideoBackgroundWrapper
                onPlay={() => setVideoLoaded(true)}
                horizontalAlign="right"
            >
                <section
                    className="my-16 max-w-[620px] justify-self-center w-full mt-44 mb-10 p-4"
                    id="stake"
                >
                    {isVideoLoaded ? (
                        <div className="w-full">
                            <h3 className="  tracking-wider text-sm md:text-xl font-bold  text-center ">
                                <Link href="/stake">{pageText.toUpperCase()} PAGE</Link>
                            </h3>
                            <br />
                            <div className="bg-background backdrop-blur-md rounded-lg md:rounded-[40px] p-4 md:p-10">
                                <div className="flex flex-col justify-start items-start gap-4">
                                    <div className="text-lg flex gap-2 justify-center items-center">
                                        <div className=" font-semibold">Total Staked :</div>
                                        <div className="">
                                            <CountUp format="0,0" end={totalStaked ? totalStaked : 0} />
                                        </div>
                                    </div>
                                    <div className="text-lg flex gap-2 justify-center items-center">
                                        <div className=" font-semibold">Total User :</div>
                                        <div className="">
                                            <CountUp format="0,0" end={totalStaker ? totalStaker : 0} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col xs:flex-row justify-between text-center w-full gap-8 my-4">
                                    <Button
                                        shadow="md"
                                        type={pageText == "Stake" ? "primary" : "default"}
                                        onClick={() => clickTap("Stake")}
                                        className={` w-full`}
                                        rounded
                                    >
                                        Stake
                                    </Button>
                                    <Button
                                        shadow="md"
                                        type={pageText == "Unstake" ? "primary" : "default"}
                                        onClick={() => clickTap("Unstake")}
                                        className={` w-full `}
                                        rounded
                                    >
                                        Unstake
                                    </Button>
                                </div>

                                <div className="">
                                    <div className="flex justify-between font-semibold  ">
                                        <span>APY Percent</span>
                                        <span>
                                            <CountUp end={aprRate ? aprRate : 8.7} suffix="%" />
                                        </span>
                                    </div>
                                    <div className=" bg-white h-px my-4" />
                                    <div className="flex justify-between items-center gap1 mt-8 mb-4">
                                        <div className=" text-xl font-bold ">
                                            Staked :&nbsp;
                                            <span className=" font-normal">
                                                <CountUp end={stakeShare} />
                                            </span>
                                            &nbsp; ZK
                                        </div>
                                        <div className=" ">
                                            {isConnected ? (
                                                <>
                                                    My ZK <CountUp end={balance} />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    {pageText == "Stake" && !checkStakeValue && (
                                        <div className=" text-[#ff0000]">
                                            The stake amount is not available
                                        </div>
                                    )}
                                    {pageText == "Unstake" && !checkUnstakeValue && (
                                        <div className=" text-[#ff0000]">
                                            The unstake amount is not available
                                        </div>
                                    )}
                                    {!(
                                        (pageText == "Stake" && !checkStakeValue) ||
                                        (pageText == "Unstake" && !checkUnstakeValue)
                                    ) && <div className=" invisible">&nbsp; </div>}
                                    {!hasStake && pageText == "Unstake" ? (
                                        <>
                                            <div className="text-center text-2xl font-bold py-24 w-full">
                                                <h3>No Staked Yet</h3>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="my-0">
                                                <div className=" bg-background flex flex-col  sm:flex-row items-center justify-between rounded-md px-4 py-3 gap-4 ">
                                                    <div className="flex  relative h-full w-full">
                                                        <Image
                                                            draggable="false"
                                                            width={50}
                                                            height={50}
                                                            className="relative h-[40px] w-[40px] top-0 left-0 z-10 m-2 rounded-sm"
                                                            src="/images/favicon.ico"
                                                            alt="zk-token"
                                                        />
                                                        <input
                                                            // disabled
                                                            className=" absolute top-0 left-0 z-0 bg-transparent border-[1px] border-white rounded-md h-full pl-16 text-3xl focus:outline-none w-full appearance-none"
                                                            type="number"
                                                            placeholder="0.0"
                                                            onChange={handleChange}
                                                            value={amount}
                                                        />
                                                    </div>

                                                    <div className="panel-btn w-full  sm:w-auto">
                                                        {pageText == "Unstake" ? (
                                                            <Button
                                                                shadow="sm"
                                                                onClick={unstakeHandle}
                                                                className="w-full"
                                                                type="primary"
                                                            >
                                                                Unstake
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                shadow="sm"
                                                                onClick={stakeHandle}
                                                                className="w-full"
                                                                type="primary"
                                                            >
                                                                &nbsp;&nbsp;Stake&nbsp;&nbsp;
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2 flex">
                                                {numeral(amount * zkPrice).format("$0,0.00000") !==
                                                    "$NaN"
                                                    ? "~" +
                                                    numeral(amount * zkPrice).format("$0,0.00000")
                                                    : "$ 0"}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {!hasStake && pageText == "Unstake" ? (
                                    <></>
                                ) : (
                                    <>
                                        <div className="amount-btn-group grid grid-cols-2 w-full xs:grid-cols-4 xs:w-fit gap-4">
                                            <Button
                                                shadow="md"
                                                type="primary"
                                                size="sm"
                                                className="w-full xs:w-24 py-[10px]"
                                                onClick={() => changeStakeInput(25)}
                                                rounded
                                            >
                                                25%
                                            </Button>
                                            <Button
                                                shadow="md"
                                                type="primary"
                                                size="sm"
                                                className="w-full xs:w-24 py-[10px]"
                                                onClick={() => changeStakeInput(50)}
                                                rounded
                                            >
                                                50 %
                                            </Button>
                                            <Button
                                                shadow="md"
                                                type="primary"
                                                size="sm"
                                                className="w-full xs:w-24 py-[10px]"
                                                onClick={() => changeStakeInput(75)}
                                                rounded
                                            >
                                                75 %
                                            </Button>
                                            <Button
                                                shadow="md"
                                                type="primary"
                                                size="sm"
                                                className="w-full xs:w-24 py-[10px]"
                                                onClick={() => changeStakeInput(100)}
                                                rounded
                                            >
                                                100 %
                                            </Button>
                                        </div>
                                        <div className=" bg-gray-400 h-px my-4" />
                                        <br />
                                    </>
                                )}
                                <div className=" bg-background flex flex-col sm:flex-row items-center justify-between rounded-md px-4 py-3 gap-4 text-gray-300">
                                    <div>
                                        <span>
                                            ZK{" "}
                                            <span className="text-yellow-300">
                                                {rewards > 0.000001
                                                    ? numeral(rewards).format("0,0.00000")
                                                    : 0}
                                            </span>
                                        </span>
                                        <div className="">
                                            <div className="">
                                                {numeral(rewards * zkPrice).format("$0,0.00000") !==
                                                    "$NaN"
                                                    ? numeral(rewards * zkPrice).format("$0,0.00000")
                                                    : "$ 0"}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        shadow="sm"
                                        type="primary"
                                        className="w-full  sm:w-auto"
                                        onClick={claimHandle}
                                    >
                                        &nbsp; Claim&nbsp;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CoinSpinner size="xl" className="m-auto" />
                    )}
                </section>
                <ConfirmBox
                    amount={amount}
                    type={modalType}
                    isOpen={isOpen}
                    handleOpenModal={handlOpenModal}
                />
            </VideoBackgroundWrapper>
        </div>
    );
};

export default StakeLayout;
