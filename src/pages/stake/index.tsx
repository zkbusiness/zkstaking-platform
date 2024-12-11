import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { ConfirmBox } from "../../components/confirmBox";
import { useStakeContext } from "../../contexts/StakeContext";
import numeral from "numeral";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import Button from "../../components/Button";

const StakeLayout: NextPage = () => {
  const {
    stakeInfo: { rewards, codePrice, balance, hasStake, stakeShare },
  } = useStakeContext();

  const { isConnected } = useAccount();

  const [pageText, setPageText] = useState("Stake");
  const [isOpen, toggle] = useState(false);
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
    <>
      <section
        className="my-16 max-w-[700px] justify-self-center w-full"
        id="stake"
      >
        <div className="w-full">
          <h3 className="text-[#4075FF]  tracking-wider text-sm md:text-xl font-bold  text-center hover:text-[rgb(79,205,255)]  ">
            <Link href="/stake">{pageText.toUpperCase()} PAGE</Link>
          </h3>
          <br />
          <div className="   bg-background  rounded-lg  md:rounded-[40px] p-4 md:p-16">
            <h3 className="text-xl md:text-2xl flex flex-col   font-bold space-y-16  mb-5">
              $CODE Token Secured Staking Platform
            </h3>
            <div className="flex justify-between text-center w-full gap-8 my-4">
              <Button
                ghost
                type={pageText == "Stake" ? "primary" : "default"}
                onClick={() => clickTap("Stake")}
                className={` w-full`}
                rounded
              >
                Stake
              </Button>
              <Button
                ghost
                type={pageText == "Unstake" ? "primary" : "default"}
                onClick={() => clickTap("Unstake")}
                className={` w-full `}
                rounded
              >
                Unstake
              </Button>
            </div>

            <div className="">
              <div className="flex justify-between font-semibold text-gray-300 ">
                <span>APY Percent</span>
                <span>{"8"} %</span>
              </div>
              <div className=" bg-gray-400 h-px my-4" />
              <div className="flex justify-between items-center gap1 mt-8 mb-4">
                <div className=" text-xl font-bold ">
                  Staked :{" "}
                  <span className=" text-yellow-300">
                    {numeral(stakeShare).format("0,0")}
                  </span>{" "}
                  $CODE
                </div>
                <div className=" font-thin">
                  {isConnected ? (
                    <>My $CODE {numeral(balance).format("0,0")}</>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {pageText == "Stake" && !checkStakeValue && (
                <div className="" style={{ color: "red" }}>
                  The stake amount is not available
                </div>
              )}
              {pageText == "Unstake" && !checkUnstakeValue && (
                <div className="" style={{ color: "red" }}>
                  The unstake amount is not available
                </div>
              )}
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
                          width={50}
                          height={50}
                          className="relative top-0 left-0 z-10 m-2 "
                          src="/images/white-code.png"
                          alt="code-token"
                        />
                        <input
                          // disabled
                          className=" absolute top-0 left-0 z-0 bg-transparent border-[1px] border-gray-500 rounded-md h-full pl-16 text-3xl focus:outline-none w-full appearance-none"
                          type="number"
                          placeholder="0.0"
                          onChange={handleChange}
                          value={amount}
                        />
                      </div>

                      <div className="panel-btn w-full  sm:w-auto">
                        {pageText == "Unstake" ? (
                          <Button
                            onClick={unstakeHandle}
                            className="w-full"
                            type="primary"
                          >
                            Unstake
                          </Button>
                        ) : (
                          <Button
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
                    {numeral(amount * codePrice).format("$0,0.00000") !== "$NaN"
                      ? "~" + numeral(amount * codePrice).format("$0,0.00000")
                      : "$ 0"}
                  </div>
                </>
              )}
            </div>
            {!hasStake && pageText == "Unstake" ? (
              <></>
            ) : (
              <>
                <div className="amount-btn-group flex gap-4">
                  <Button
                    type="primary"
                    size="sm"
                    className="w-24 py-[10px]"
                    onClick={() => changeStakeInput(25)}
                    rounded
                  >
                    25%
                  </Button>
                  <Button
                    type="primary"
                    size="sm"
                    className="w-24 py-[10px]"
                    onClick={() => changeStakeInput(50)}
                    rounded
                  >
                    50 %
                  </Button>
                  <Button
                    type="primary"
                    size="sm"
                    className="w-24 py-[10px]"
                    onClick={() => changeStakeInput(75)}
                    rounded
                  >
                    75 %
                  </Button>
                  <Button
                    type="primary"
                    size="sm"
                    className="w-24 py-[10px]"
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
                  $CODE{" "}
                  <span className="text-yellow-300">
                    {rewards > 0.000001
                      ? numeral(rewards).format("0,0.00000")
                      : 0}
                  </span>
                </span>
                <div className="">
                  <div className="">
                    {numeral(rewards * codePrice).format("$0,0.00000") !==
                    "$NaN"
                      ? numeral(rewards * codePrice).format("$0,0.00000")
                      : "$ 0"}
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                className="w-full  sm:w-auto"
                onClick={claimHandle}
              >
                &nbsp; Claim&nbsp;
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ConfirmBox
        amount={amount}
        type={modalType}
        isOpen={isOpen}
        handleOpenModal={handlOpenModal}
      />
    </>
  );
};

export default StakeLayout;
