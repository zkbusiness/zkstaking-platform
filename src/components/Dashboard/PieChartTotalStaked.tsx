import { PieChart, Pie, Cell } from "recharts";

export function PieChartTotalStaked({
    data,
    renderCustomizedLabel,
    COLORS,
    pieSize,
}: {
    data: any;
    renderCustomizedLabel: any;
    COLORS: any;
    pieSize: number;
}) {
    return (
        <PieChart width={pieSize} height={pieSize}>
            <Pie
                data={data}
                cx={(pieSize - 10) / 2}
                cy={(pieSize - 10) / 2}
                labelLine={false}
                label={renderCustomizedLabel}
                // fill="#8884d8"
                dataKey="value"
                outerRadius={(pieSize - 20) / 2}
            >
                {data.map((entry: any, index: number) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
}
