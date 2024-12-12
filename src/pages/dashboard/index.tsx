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
    stakeInfo: { rewards, balance, totalStaked, stakeShare, maxTokensStakable },
  } = useStakeContext();

  const { address, isConnected } = useAccount();

  const [pieLoadTime, setPieLoadTime] = useState<boolean>(false);
  const [todayReward, setTodayReward] = useState(0);
  const isMobile = useScreenWidth(600);

  const [chartData, setChartData] = useState([
    {
      date: "1 day",
      reward: "0",
    },
    {
      date: "2 day",
      reward: "0",
    },
    {
      date: "3 day",
      reward: "0",
    },
    {
      date: "4 day",
      reward: "0",
    },
    {
      date: "5 day",
      reward: "0",
    },
    {
      date: "6 day",
      reward: "0",
    },
    {
      date: "7 day",
      reward: "0",
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
          reward,
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
  useEffect(() => {}, []);

  // available staking
  const availStaking = [
    { name: "available", value: maxTokensStakable },
    { name: "staked", value: totalStaked },
  ];

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
    <div className=" text-center ">
      <h2 className=" text-5xl font-bold mt-16 mb-6">User Dashboard</h2>
      {isConnected && address ? (
        <>
          <div className="">
            <h3 className="text-[#4075FF]  tracking-wider text-sm md:text-xl font-bold">
              My $CODE : {balance}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row  mt-6  justify-between justify-self-center max-w-[940px] w-full ">
            <div className="col-sm-12 col-md-6 w-full md:w-fit ">
              {pieLoadTime ? (
                <div className="flex">
                  <div className="m-auto">
                    <div className="tracking-wider text-lg md:text-xl font-bold">
                      Available Staking
                    </div>
                    <div className="flex text-lg md:text-xl items-center gap-2">
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#0088FE",
                          borderRadius: "100%",
                        }}
                      ></div>
                      <div className=""> max stakable amount</div>
                    </div>
                    <div className="flex text-lg md:text-xl items-center gap-2">
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#00C49F",
                          borderRadius: "100%",
                        }}
                      ></div>
                      <div className=""> total staked amount</div>
                    </div>
                    <PieChartTotalStaked
                      COLORS={COLORS}
                      renderCustomizedLabel={renderCustomizedLabel}
                      data={availStaking}
                    />
                  </div>
                </div>
              ) : (
                <CoinSpinner
                  isSilver
                  size="xl"
                  className="h-full w-full flex items-center justify-center"
                />
              )}
              {isConnected
                ? pieLoadTime && (
                    <div className="flex mt-4">
                      <div className="m-auto">
                        <div className="racking-wider text-lg md:text-xl font-bold">
                          Your Percent
                        </div>
                        <div className="flex text-lg md:text-xl items-center gap-2">
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              background: "#00C49F",
                              borderRadius: "100%",
                            }}
                          ></div>
                          <div className=""> total staked amount</div>
                        </div>
                        <div className="flex text-lg md:text-xl items-center gap-2">
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              background: "#0088FE",
                              borderRadius: "100%",
                            }}
                          ></div>
                          <div className=""> your staked amount</div>
                        </div>
                        <PieChartTotalStaked
                          COLORS={COLORS2}
                          renderCustomizedLabel={renderCustomizedLabel}
                          data={yourPercent}
                        />
                      </div>
                    </div>
                  )
                : pieLoadTime && (
                    <div className="text-[#4075FF]  tracking-wider text-sm md:text-xl font-bold mt-24">
                      Connect wallet to see information
                    </div>
                  )}
            </div>
            <br className=" block md:hidden" />
            <div className="flex w-full md:w-96 flex-col gap-14 px-4 md:px-0">
              <Button size="xs" type="dark" className="w-full ">
                <span className="w-full">APY</span>
                <span className=" w-full">
                  <CountUp end={8} suffix="%" />
                </span>
              </Button>
              <Button size="xs" type="dark" className="w-full ">
                <span className="w-full">Total Staked</span>
                <span className=" w-full">
                  <CountUp end={totalStaked} />
                </span>
              </Button>
              <Button size="xs" type="dark" className="w-full ">
                <span className="w-full">Stake Fee</span>
                <span className=" w-full">
                  <CountUp end={APP_ENV.STAKE_FEE} suffix="%" />
                </span>
              </Button>
              <Button size="xs" type="dark" className="w-full ">
                <span className="w-full">Unstake Fee</span>
                <span className=" w-full">
                  <CountUp end={APP_ENV.STAKE_FEE} suffix="%" />
                </span>
              </Button>
              <Button size="xs" type="dark" className="w-full ">
                <span className="w-full">Max Stakable</span>
                <span className=" w-full">
                  <CountUp end={maxTokensStakable} />
                </span>
              </Button>
              {address && isConnected ? (
                <>
                  <Button size="xs" type="dark" className="w-full ">
                    <span className="w-full">My Staking</span>
                    <span className=" w-full">
                      <CountUp end={stakeShare} />
                    </span>
                  </Button>
                  <Button size="xs" type="dark" className="w-full ">
                    <span className="w-full">Reward</span>
                    <span className=" w-full">
                      <CountUp end={rewards} />
                    </span>
                  </Button>
                </>
              ) : (
                <div className="text-[#4075FF]  tracking-wider text-sm md:text-xl font-bold mt-24">
                  Connect wallet to see information
                </div>
              )}
            </div>
          </div>

          <div className="chart-container justify mb-2 mt-6">
            {address && isConnected && (
              <>
                <div className="mt-16">
                  <h5 className="primary-color">
                    Today Reward Chart :&nbsp;{todayReward} &nbsp; ZK
                  </h5>
                </div>

                {todayReward > 0 && (
                  <LineChart
                    height={400}
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 50,
                      left: isMobile ? 0 : chartData.length > 0 ? 30 : 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      labelStyle={{ color: "black", fontSize: "20px" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="reward"
                      stroke="#8884d8"
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="text-[#4075FF]  tracking-wider text-sm md:text-xl font-bold mt-24">
          Connect wallet to see information
        </div>
      )}
    </div>
  );
};

export default Dashboard;
