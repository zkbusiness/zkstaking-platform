import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { useAccount, useConfig } from "wagmi";
import { useStakeContext } from "@contexts/StakeContext";
import { APP_ENV } from "@config/index";
import { NextPage } from "next";
import { PieChartTotalStaked } from "@components/Dashboard/PieChartTotalStaked";
import { useScreenWidth } from "@hooks/useScreenWidth";
import Button from "@components/ui/Button";
import { CountUp } from "@components/ui/CountUp";
import CoinSpinner from "@components/ui/CoinSpinner";

const Dashboard: NextPage = () => {
    const {
        stakeInfo: { rewards, balance, totalStaked, stakeShare, totalStaker, totalTx, aprRate },
    } = useStakeContext();

    const { address, isConnected } = useAccount();

    const [pieLoadTime, setPieLoadTime] = useState<boolean>(false);
    const [todayReward, setTodayReward] = useState(0);
    const isMobile = useScreenWidth(1200);
    const [winObj, setWinObj] = useState<any>({})

    const [chartData, setChartData] = useState([
        {
            date: "1 day",
            reward: "100",
        },
        {
            date: "2 day",
            reward: "200",
        },
        {
            date: "3 day",
            reward: "500",
        },
        {
            date: "4 day",
            reward: "150",
        },
        {
            date: "5 day",
            reward: "700",
        },
        {
            date: "6 day",
            reward: "620",
        },
        {
            date: "7 day",
            reward: "350",
        },
    ]);

    useEffect(() => {
        if (address && isConnected && stakeShare) {
            let chartData: any = [];
            let eightPercentAmount = (stakeShare / 100) * 8;
            let dailyReward = eightPercentAmount / 365;
            setTodayReward(Number(dailyReward.toFixed(3)));
            for (let i = 1; i <= 24; i++) {
                let reward = Number(((dailyReward * i) / 24).toFixed(3));
                chartData.push({
                    date: i + "h",
                    reward: reward ? reward : 0,
                });
            }
            setChartData(chartData);
        }
    }, [address, isConnected, stakeShare]);

    useEffect(() => {
        setPieLoadTime(false);
        // Code that uses `window`
        setTimeout(() => {
            if (typeof window !== "undefined") {
                setPieLoadTime(true);
            }
        }, 3000);
    }, []);

    useEffect(() => {
        setWinObj(window);
    }, [])

    // your percent
    const yourPercent = [
        { name: "total staked", value: totalStaked },
        { name: "your amount", value: stakeShare },
    ];

    const COLORS = ["#0088FE", "#00C49F"];
    const COLORS2 = ["#00C49F", "#0088FE"];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="text-center mx-6">
            <h2 className=" text-5xl font-bold mt-16 mb-6">User Dashboard</h2>
            {isConnected && address ? (
                <>
                    <div className="mb-4">
                        <h3 className="text-[#4075FF] tracking-wider text-sm md:text-xl font-bold">
                            My $ZK : {balance}
                        </h3>
                    </div>
                    <div className="dashboard-info">
                        <Button type="dark" className=" w-full whitespace-nowrap">
                            <span className="w-full">APR</span>
                            <span className=" w-full">
                                <CountUp format="0,0.0" end={aprRate ? aprRate : 8.7} suffix="%" />
                            </span>
                        </Button>
                        <Button type="dark" className=" w-full whitespace-nowrap">
                            <span className="w-full">TVL</span>
                            <span className=" w-full">
                                <CountUp format="0,0.000" end={totalStaked} />
                            </span>
                        </Button>
                        <Button type="dark" className=" w-full whitespace-nowrap">
                            <span className="w-full">Total Staker</span>
                            <span className=" w-full">
                                <CountUp format="0,0" end={totalStaker} />
                            </span>
                        </Button>
                        <Button type="dark" className=" w-full whitespace-nowrap">
                            <span className="w-full">Total Transaction</span>
                            <span className=" w-full">
                                <CountUp format="0,0" end={totalTx} />
                            </span>
                        </Button>
                        <Button type="dark" className="min-[150px] w-full whitespace-nowrap">
                            <span className="w-full">My Staking</span>
                            <span className=" w-full">
                                <CountUp format="0,0.0000" end={stakeShare} />
                            </span>
                        </Button>
                        <Button type="dark" className="min-[150px] w-full whitespace-nowrap">
                            <span className="w-full">Reward</span>
                            <span className=" w-full">
                                <CountUp format="0,0.00000" end={rewards} />
                            </span>
                        </Button>
                        <Button type="dark" className="min-[150px] w-full whitespace-nowrap">
                            <span className="w-full">Stake Fee</span>
                            <span className=" w-full">
                                <CountUp format="0,0.00" end={APP_ENV.STAKE_FEE} suffix="%" />
                            </span>
                        </Button>
                        <Button type="dark" className="min-[150px] w-full whitespace-nowrap">
                            <span className="w-full">Unstake Fee</span>
                            <span className=" w-full">
                                <CountUp format="0,0.00" end={APP_ENV.STAKE_FEE} suffix="%" />
                            </span>
                        </Button>
                    </div>
                    {
                        !pieLoadTime ?
                            <div className="flex w-full justify-center my-20">
                                <CoinSpinner
                                    isSilver
                                    size="xl"
                                    className="h-full w-full flex items-center justify-center"
                                />
                            </div>
                            :
                            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} mt-10 justify-between gap-4 justify-self-center w-full px-4`}>
                                <div className={`${isMobile ? 'w-full' : 'md:w-fit flex justify-center'}`}>
                                    <div className="flex mt-4">
                                        <div className="m-auto">
                                            <div className="tracking-wider text-lg md:text-xl font-bold">
                                                Your Percent
                                            </div>
                                            <div className={`${isMobile ? 'flex-row-reverse justify-start items-center gap-4' : 'flex-col'} flex`}>
                                                <div className="">
                                                    <div className="flex flex-col sm:flex-row text-lg md:text-xl items-start sm:items-center gap-2">
                                                        <div
                                                            style={{
                                                                width: "10px",
                                                                height: "10px",
                                                                background: "#00C49F",
                                                                borderRadius: "100%",
                                                            }}
                                                        ></div>
                                                        <div className="">TVL</div>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row text-lg md:text-xl items-start sm:items-center gap-2">
                                                        <div
                                                            style={{
                                                                width: "10px",
                                                                height: "10px",
                                                                background: "#0088FE",
                                                                borderRadius: "100%",
                                                            }}
                                                        ></div>
                                                        <div className="text-start">My Amount</div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <PieChartTotalStaked
                                                        COLORS={COLORS2}
                                                        renderCustomizedLabel={renderCustomizedLabel}
                                                        data={yourPercent}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {winObj &&
                                    <LineChart
                                        height={500}
                                        width={isMobile ? winObj.innerWidth - 80 : winObj.innerWidth - 370}
                                        data={chartData}
                                        margin={{
                                            top: 5,
                                            right: 5,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                    >
                                        {/* <CartesianGrid strokeDasharray="2 2" /> */}
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        {/* <Tooltip
                                            labelStyle={{ color: "black", fontSize: "20px" }}
                                        /> */}
                                        {/* <Legend /> */}
                                        <Line
                                            type="monotone"
                                            dataKey="reward"
                                            stroke="#8884d8"
                                            activeDot={{ r: 5 }}
                                        />
                                    </LineChart>
                                }
                            </div>
                    }
                </>
            ) : (
                <div className="text-[#4075FF]   text-sm md:text-xl font-bold mt-24">
                    Connect wallet to see information
                </div>
            )}
        </div>
    );
};

export default Dashboard;
