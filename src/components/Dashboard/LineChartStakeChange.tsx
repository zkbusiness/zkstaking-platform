import Select from "@components/ui/Select";
import { useScreenWidth } from "@hooks/useScreenWidth";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
} from "recharts";

const options = [
    { value: "day", label: "1D" },
    { value: "week", label: "7D" },
    { value: "month", label: "1M" },
    { value: "six_month", label: "6M" },
    { value: "year", label: "1Y" },
    { value: "all", label: "ALL" },
];

const weeklydata = [
    {
        time: "1 day",
        amount: 600,
    },
    {
        time: "2 day",
        amount: 500,
    },
    {
        time: "3 day",
        amount: 500,
    },
    {
        time: "4 day",
        amount: 450,
    },
    {
        time: "5 day",
        amount: 800,
    },
    {
        time: "6 day",
        amount: 620,
    },
    {
        time: "7 day",
        amount: 550,
    },
];

const dailyData = [
    { time: "00:00", amount: 100 },
    { time: "01:00", amount: 120 },
    { time: "02:00", amount: 90 },
    { time: "03:00", amount: 80 },
    { time: "04:00", amount: 110 },
    { time: "05:00", amount: 150 },
    { time: "06:00", amount: 200 },
    { time: "07:00", amount: 250 },
    { time: "08:00", amount: 300 },
    { time: "09:00", amount: 350 },
    { time: "10:00", amount: 400 },
    { time: "11:00", amount: 450 },
    { time: "12:00", amount: 500 },
    { time: "13:00", amount: 400 },
    { time: "14:00", amount: 300 },
    { time: "15:00", amount: 250 },
    { time: "16:00", amount: 225 },
    { time: "17:00", amount: 275 },
    { time: "18:00", amount: 320 },
    { time: "19:00", amount: 340 },
    { time: "20:00", amount: 400 },
    { time: "21:00", amount: 380 },
    { time: "22:00", amount: 300 },
    { time: "23:00", amount: 200 },
];

const monthlyData = [
    { time: "1 day", amount: 620 },
    { time: "2 day", amount: 550 },
    { time: "3 day", amount: 700 },
    { time: "4 day", amount: 690 },
    { time: "5 day", amount: 720 },
    { time: "6 day", amount: 650 },
    { time: "7 day", amount: 600 },
    { time: "8 day", amount: 680 },
    { time: "9 day", amount: 710 },
    { time: "10 day", amount: 640 },
    { time: "11 day", amount: 750 },
    { time: "12 day", amount: 730 },
    { time: "13 day", amount: 670 },
    { time: "14 day", amount: 690 },
    { time: "15 day", amount: 720 },
    { time: "16 day", amount: 710 },
    { time: "17 day", amount: 680 },
    { time: "18 day", amount: 600 },
    { time: "19 day", amount: 650 },
    { time: "20 day", amount: 570 },
    { time: "21 day", amount: 690 },
    { time: "22 day", amount: 710 },
    { time: "23 day", amount: 740 },
    { time: "24 day", amount: 750 },
    { time: "25 day", amount: 780 },
    { time: "26 day", amount: 720 },
    { time: "27 day", amount: 600 },
    { time: "28 day", amount: 630 },
    { time: "29 day", amount: 650 },
    { time: "30 day", amount: 690 },
];

const sixMonthData = [
    { time: "January", amount: 600 },
    { time: "February", amount: 620 },
    { time: "March", amount: 580 },
    { time: "April", amount: 650 },
    { time: "May", amount: 700 },
    { time: "June", amount: 640 },
    { time: "July", amount: 720 },
];
const yearlyData = [
    { time: "January", amount: 750 },
    { time: "February", amount: 780 },
    { time: "March", amount: 700 },
    { time: "April", amount: 720 },
    { time: "May", amount: 800 },
    { time: "June", amount: 780 },
    { time: "July", amount: 850 },
    { time: "August", amount: 790 },
    { time: "September", amount: 740 },
    { time: "October", amount: 760 },
    { time: "November", amount: 800 },
    { time: "December", amount: 820 },
];

const allTimeData = [
    { time: "2020", amount: 8500 },
    { time: "2021", amount: 9000 },
    { time: "2022", amount: 9100 },
    { time: "2023", amount: 9500 },
    { time: "2024", amount: 10000 }, // hypothetical future data for projection
];

interface FetchData {
    time: string;
    amount: number;
}

const LineChartStakeChange = () => {
    const isMobile = useScreenWidth(1200);
    const [domainStart, setDomainStart] = useState(0);
    const [chartData, setChartData] = useState<any>([]);
    const [view, setView] = useState("week");

    useEffect(() => {
        let data: FetchData[] = [];

        switch (true) {
            case view === "day":
                data = dailyData;
                break;
            case view === "week":
                data = weeklydata;
                break;
            case view === "month":
                data = monthlyData;
                break;
            case view === "six_month":
                data = sixMonthData;
                break;
            case view === "year":
                data = yearlyData;
                break;
            case view === "all":
                data = allTimeData;
                break;

            default:
                break;
        }

        setChartData(data);
        setDomainStart([...data].sort((a, b) => a.amount - b.amount)[0].amount);
    }, [view]);

    return (
        <div className="w-full relative">
            <Select
                options={options}
                className=" absolute  right-0 w-20 top-0"
                style={{
                    zIndex: "10000",
                }}
                defaultValue="week"
                onChange={(value) => setView(value)}
            />
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
                    <YAxis domain={[domainStart]} />
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
        </div>
    );
};

export default LineChartStakeChange;
