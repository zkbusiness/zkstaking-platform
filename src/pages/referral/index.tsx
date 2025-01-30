import React, { useEffect, useState } from "react";

import { useAccount, useConfig } from "wagmi";
import { useStakeContext } from "@contexts/StakeContext";
import { APP_ENV } from "@config/index";
import { NextPage } from "next";
import { PieChartTotalStaked } from "@components/Dashboard/PieChartTotalStaked";
import { useScreenWidth } from "@hooks/useScreenWidth";
import Button from "@components/ui/Button";
import { CountUp } from "@components/ui/CountUp";
import CoinSpinner from "@components/ui/CoinSpinner";
import LineChartStakeChange from "@components/Dashboard/LineChartStakeChange";
import numeral from "numeral";

const Referral: NextPage = () => {
    // const {
    //     stakeInfo: {
    //         rewards,
    //         balance,
    //         totalStaked,
    //         stakeShare,
    //         totalStaker,
    //         totalTx,
    //         aprRate,
    //     },
    // } = useStakeContext();

    // const { address, isConnected } = useAccount();

    return (
        <div className="text-center mx-6">
            <h2 className=" text-5xl font-bold mt-16 mb-6">Referrals</h2>
            <div className="my-40">
                <h2 className="text-[#4075FF] tracking-wider text-2xl md:text-3xl font-bold animate-pulse">
                    Coming soon...
                </h2>
            </div>
            {/* <div className="dashboard-info">
                <Button
                    type="dark"
                    className=" w-full whitespace-nowrap"
                >
                    <span className="w-full">APR</span>
                    <span className=" w-full">
                        <CountUp
                            format="0,0.0"
                            end={aprRate ? aprRate : 8.7}
                            suffix="%"
                        />
                    </span>
                </Button>
            </div> */}
        </div>
    );
};

export default Referral;
