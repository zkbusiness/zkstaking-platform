import Select from "@components/ui/Select";
import { useScreenWidth } from "@hooks/useScreenWidth";
import { formatNumber } from "@utils/index";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const options = [
    { value: "week", label: "7D" },
    { value: "month", label: "1M" },
    { value: "six_month", label: "6M" },
    { value: "year", label: "1Y" },
    { value: "all", label: "ALL" },
];

interface FetchedData {
    time: string;
    amount: number;
}

const LineChartStakeChange = () => {
    const isMobile = useScreenWidth(1200);
    const [domainStart, setDomainStart] = useState(0);
    const [chartData, setChartData] = useState<any>([]);
    const [view, setView] = useState("week");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/history/${view}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setChartData(data);
                setDomainStart(
                    [...data].sort((a, b) => a.amount - b.amount)[0].amount
                );
            })
            .catch((err) => { });
    }, [view]);

    return (
        <div className="w-full relative">
            <Select
                options={options}
                className=" absolute right-0 w-20 top-0"
                style={{
                    zIndex: "10000",
                }}
                defaultValue="week"
                onChange={(value) => setView(value)}
            />
            {
                chartData.length > 0 ?
                    <>

                        <ResponsiveContainer width={"100%"} height={450}>
                            <LineChart
                                className={isMobile ? " -translate-x-4" : ""}
                                height={500}
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 5,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <XAxis dataKey="time" />
                                <YAxis
                                    domain={[domainStart]}
                                    tickFormatter={(value) => formatNumber(value)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "5px",
                                        backgroundColor: "#1A1A1A",
                                        border: "none",
                                    }}
                                    labelStyle={{
                                        color: "white",
                                        fontSize: "20px",
                                    }}
                                    formatter={(value: number) => {
                                        return <>{formatNumber(value, "0,0")}</>;
                                    }}
                                />
                                {/* <Legend /> */}
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                    :
                    <>
                        <h1 className="h-full flex justify-center items-center text-2xl">🙁 No chart</h1>
                    </>
            }
        </div>
    );
};

export default LineChartStakeChange;
