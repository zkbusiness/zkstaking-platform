import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { useStakeContext } from "../../contexts/StakeContext";
import numeral from "numeral";
import { ConfirmButton } from "./confirmButton";
import { useAccount, useConfig } from "wagmi";
import { toast } from "react-toastify";
import { getTransactionReceipt } from "wagmi/actions";
import { APP_ENV } from "../../config";
import { BsCheck2Circle, BsXCircle } from "react-icons/bs";
import Button from "../ui/Button";

//define type
interface ConfirmBoxTypes {
    amount: number;
    type: "stake" | "unstake" | "claim" | "";
    isOpen: boolean;
    handleOpenModal: (
        isOpen: boolean,
        type: "stake" | "unstake" | "claim" | ""
    ) => void;
}
export const ConfirmBox = ({
    amount,
    type,
    isOpen,
    handleOpenModal,
}: ConfirmBoxTypes) => {
    const {
        stakeInfo: { rewards, zkPrice, balance, hasStake, totalStaker, aprRate },
        allowance,
        currentTx,
        txStatus,
        txHash,
        txError,
        approve,
        stake,
        claim,
        unstake,
        setTxStatus,
        refresh,
        refreshWithoutConnect
    } = useStakeContext();

    const config = useConfig();
    const { address, chainId, isConnected } = useAccount();
    const [step, setStep] = useState<"success" | "error" | "">("");
    const [pendingTx, setPendingTx] = useState(false);
    const [buttonText, setButtonText] = useState("Stake Now");
    const [showMsg, setShowMsg] = useState("");

    const verifyStep = () => {
        if (type !== "claim") {
            if (!amount) {
                toast.warning("Check your amount");
                return false;
            }
        }
        if (pendingTx) {
            toast.warning("Please wait pending transaction");
            return false;
        }
        if (!address || !isConnected) {
            toast.warning("Please connect wallet again");
            return false;
        }
        setPendingTx(true);
        return true;
    };
    const handleStaking = async () => {
        if (!verifyStep()) return;
        if (allowance < amount * 10 ** APP_ENV.ZK_DECIMAL) {
            approve(amount);
        } else {
            stake(amount);
        }
    };
    const handleUnstaking = async () => {
        if (!verifyStep()) return;
        unstake(amount);
    };

    const handleClaim = async () => {
        if (!verifyStep()) return;
        if (!hasStake) {
            toast.warning("You have to stake for claim");
            setPendingTx(false);
            return;
        }
        claim();
    };

    useEffect(() => {
        const fn = async (callback: any) => {
            try {
                await getTransactionReceipt(config, {
                    hash: txHash as `0x${string}`,
                });
                callback();
            } catch (e) {
                setTimeout(() => {
                    fn(callback);
                }, 1000);
            }
        };
        try {
            if (currentTx === "approve") {
                if (txStatus === "success") {
                    fn(() => {
                        stake(amount);
                    });
                } else if (txStatus === "error") {
                    setPendingTx(false);
                    setTxStatus("");
                    toast.error(txError);
                } else if (txStatus === "pending") {
                    setShowMsg("Processing token...");
                }
            } else if (currentTx === "stake" || currentTx === "unstake") {
                if (txStatus === "success") {
                    fn(() => {
                        setStep(txStatus);
                        setPendingTx(false);
                        setTxStatus("");
                        refresh();
                        refreshWithoutConnect();
                        if (currentTx === "stake") toast.success("Successfully Staked");
                        else toast.success("Successfully Unstaked");
                    });
                } else if (txStatus === "error") {
                    setPendingTx(false);
                    setTxStatus("");
                    if (txError.message.includes("Contract Maximum Stake exceeded")) {
                        toast.error("You can not stake because stake limited.");
                    } else {
                        toast.error("Transaction failed");
                    }
                } else if (txStatus === "pending") {
                    setShowMsg("Please wait confirm");
                } else {
                    setShowMsg("");
                }
            } else if (currentTx === "claim") {
                if (txStatus === "success") {
                    fn(() => {
                        setStep(txStatus);
                        setPendingTx(false);
                        setTxStatus("");
                        refresh();
                        refreshWithoutConnect();
                        toast.success("Successfully Claimed");
                    });
                } else if (txStatus === "error") {
                    setPendingTx(false);
                    setStep(txStatus);
                    setTxStatus("");
                    toast.error("Claim Transaction failed");
                } else if (txStatus === "pending") {
                    setShowMsg("Please wait claim");
                } else {
                    setShowMsg("");
                }
            }
        } catch (error: any) {
            setPendingTx(false);
            setTxStatus("");
            toast.error(error);
        }
    }, [currentTx, txStatus]);

    useEffect(() => {
        if (type == "stake") {
            setButtonText("Stake Now");
        } else if (type == "unstake") {
            setButtonText("Unstake Now");
        } else if (type == "claim") {
            setButtonText("Claim Now");
        }
    }, [type]);

    const done = () => {
        handleOpenModal(false, "");
        setStep("");
        setTxStatus("");
        refresh();
        refreshWithoutConnect();
    };

    const getAPRRate = () => {
        let apr = 8.7;
        if (aprRate)
            return aprRate;
        if (totalStaker <= 3)
            apr = 13.5;
        return apr;
    }

    return (
        <Modal
            isOpen={isOpen}
            handleClose={() => {
                if (step !== "") {
                    handleOpenModal(false, "");
                    done();
                    return;
                }
                handleOpenModal(false, "");
            }}
        >
            {step !== "" ? (
                <>
                    <div className="flex flex-col justify-between h-full">
                        <div className="">
                            <h3> {step == "success" ? <>Congratulations</> : <>Failed</>}</h3>
                        </div>
                        <div className=" ">
                            <div className="flex flex-col between h-100">
                                <div className="m-auto">
                                    {step == "success" ? (
                                        <BsCheck2Circle color="#21d621" fontSize={"8rem"} />
                                    ) : (
                                        <BsXCircle color="#dd2424" fontSize={"8rem"} />
                                    )}
                                </div>
                                <div className="flex w-full justify-center">
                                    <div
                                        className={`${step == "success" ? "" : ""
                                            } transaction-text`}
                                    >
                                        {step == "success" ? (
                                            <>
                                                Successfully{' '}
                                                {currentTx == "claim"
                                                    ? `${currentTx}ed`
                                                    : `${currentTx}d`}
                                            </>
                                        ) : (
                                            <>{currentTx} Failed</>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-center flex">
                            <Button shadow="md" rounded type="primary" onClick={done}>
                                Done
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-between h-full">
                    <div className="">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold flex flex-col space-y-16 ">
                            Please Confirm
                        </h3>
                    </div>
                    <div className=" w-full mt-3 ">
                        <div className="flex flex-col justify-between">
                            {type == "stake" && (
                                <>
                                    <div className="">
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            $ZK Amount : {numeral(amount).format("0,0.00000")}
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            Fee {APP_ENV.STAKE_FEE}% :
                                            {numeral(
                                                (amount / 1000) * (APP_ENV.STAKE_FEE * 10)
                                            ).format("0,0.00000") !== "$NaN"
                                                ? numeral(
                                                    (amount / 1000) * (APP_ENV.STAKE_FEE * 10)
                                                ).format("0,0.00000")
                                                : 0}
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            Fee USD :
                                            {numeral(
                                                (amount / 1000) * (APP_ENV.STAKE_FEE * 10) * zkPrice
                                            ).format("$0,0.00000") !== "$NaN"
                                                ? numeral(
                                                    (amount / 1000) *
                                                    (APP_ENV.STAKE_FEE * 10) *
                                                    zkPrice
                                                ).format("$0,0.00000")
                                                : 0}
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            {getAPRRate()}% APY Amount :
                                            {numeral((amount / 1000) * (getAPRRate() * 10)).format("0,0.00000")}
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            {getAPRRate()}% APY USD :
                                            {numeral((amount / 1000) * (getAPRRate() * 10) * zkPrice).format(
                                                "$0,0.00000"
                                            ) !== "$NaN"
                                                ? numeral((amount / 1000) * (getAPRRate() * 10) * zkPrice).format(
                                                    "$0,0.00000"
                                                )
                                                : 0}
                                        </p>
                                    </div>
                                    <ConfirmButton
                                        text={buttonText}
                                        showMsg={showMsg}
                                        isLoading={pendingTx}
                                        handleFunc={handleStaking}
                                    />
                                </>
                            )}
                            {type == "unstake" && (
                                <>
                                    <div className="">
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            $ZK Amount : {numeral(amount).format("0,0.00000")}
                                        </p>
                                        <p style={{ color: "yellow" }}>
                                            + (reward) :
                                            <span className="" style={{ color: "yellow" }}>
                                                {rewards > 0.000001
                                                    ? numeral(rewards).format("0,0.00000")
                                                    : 0}
                                            </span>
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            Fee {APP_ENV.STAKE_FEE}% :
                                            {numeral(
                                                (amount / 1000) * (APP_ENV.STAKE_FEE * 10)
                                            ).format("0,0.00000") !== "$NaN"
                                                ? numeral(
                                                    (amount / 1000) * (APP_ENV.STAKE_FEE * 10)
                                                ).format("0,0.00000")
                                                : 0}
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            Fee USD :
                                            {numeral(
                                                (amount / 1000) * (APP_ENV.STAKE_FEE * 10) * zkPrice
                                            ).format("$0,0.00000") !== "$NaN"
                                                ? numeral(
                                                    (amount / 1000) *
                                                    (APP_ENV.STAKE_FEE * 10) *
                                                    zkPrice
                                                ).format("$0,0.00000")
                                                : 0}
                                        </p>
                                    </div>

                                    <ConfirmButton
                                        text={buttonText}
                                        showMsg={showMsg}
                                        isLoading={pendingTx}
                                        handleFunc={handleUnstaking}
                                    />
                                </>
                            )}
                            {type == "claim" && (
                                <>
                                    <div className="mb-28">
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            Claim Amount :
                                            <span className="" style={{ color: "yellow" }}>
                                                {rewards > 0.000001
                                                    ? numeral(rewards).format("0,0.00000")
                                                    : 0}
                                            </span>
                                        </p>
                                        <p className="h-10 flex items-center font-thin tracking-wider">
                                            USD Price :
                                            {numeral(rewards * zkPrice).format("$0,0.00000") !==
                                                "$NaN"
                                                ? numeral(rewards * zkPrice).format("$0,0.00000")
                                                : "smaller than 0.00001 "}
                                        </p>
                                    </div>
                                    <ConfirmButton
                                        text={buttonText}
                                        showMsg={showMsg}
                                        isLoading={pendingTx}
                                        handleFunc={handleClaim}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="w-full text-center mt-4 text-white tracking-wider text-sm md:text-lg font-bold">
                        {type == "claim" ? (
                            <>* No fee applies for {type}</>
                        ) : (
                            <>
                                * {APP_ENV.STAKE_FEE}% fee applies for {type}
                            </>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};
