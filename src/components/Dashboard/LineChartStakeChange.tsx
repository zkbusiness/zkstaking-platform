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
    Legend,

} from "recharts";

const options = [
    { value: "week", label: "7D" },
    { value: "month", label: "1M" },
    { value: "six_month", label: "6M" },
    { value: "year", label: "1Y" },
    { value: "all", label: "ALL" },
];

interface ActivedLineType {
    max: boolean;
    min: boolean;
    avg: boolean;
}

interface DataPoint {
    time: string;
    min?: number; // Make min, max, and avg optional
    max?: number;
    avg?: number;
}

type LineKeys = keyof ActivedLineType;



const LineChartStakeChange = () => {
    const isMobile = useScreenWidth(1200);
    const [domainStart, setDomainStart] = useState(0);
    const [chartData, setChartData] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [view, setView] = useState("week");
    const [activeLines, setActiveLines] = useState<ActivedLineType>({ min: false, avg: true, max: false })

    const handleLegendClick = (dataKey: string) => {
        setActiveLines((prev) => ({
            ...prev,
            [dataKey]: !prev[dataKey as LineKeys],
        }));
    };
    const CustomLegend = ({ onClick }: { onClick: Function }) => {
        return (
            <ul className="recharts-legend flex  justify-self-center gap-2 items-center">
                {["min", "avg", "max"]?.map((value, index) => {
                    return (
                        <li
                            key={`item-${index}`}
                            onClick={() => onClick(value)}
                            className={`flex select-none cursor-pointer items-center py-2 px-4`}
                            style={{
                                color: value === "min" ? "#FFC107" : value === "avg" ? "#4CAF50" : "#1E88E5",
                                opacity: activeLines[value as LineKeys] ? "1" : "0.5"
                            }}
                        >
                            <span >&#8226;</span> &nbsp;{value.toLocaleUpperCase()}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const setCharDataByTypes = (data: any) => {
        let returnValue = data.map(({ time, min, max, avg }: DataPoint) => {
            let temp: DataPoint = { time, min, max, avg }
            if (!activeLines.min) delete temp.min
            if (!activeLines.avg) delete temp.avg
            if (!activeLines.max) delete temp.max
            return temp
        })
        const allValues = returnValue.flatMap((item: any) => {
            // Create an array with existing numeric values
            return [item?.min, item?.max, item?.avg].filter(value => value !== undefined);
        });

        // Find the smallest value
        const smallestValue = Math.min(...allValues);
        setDomainStart(smallestValue);
        setChartData(returnValue)

    }

    useEffect(() => {
        setCharDataByTypes(data)
    }, [activeLines, data])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/history/${view}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
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

                        <ResponsiveContainer width={"100%"} height={500}>
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
                                <Legend content={<CustomLegend onClick={handleLegendClick} />} />
                                <Line
                                    type="monotone"
                                    dataKey="min"
                                    stroke="#FFC107"
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="avg"
                                    stroke="#4CAF50"
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="max"
                                    stroke="#1E88E5"
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
