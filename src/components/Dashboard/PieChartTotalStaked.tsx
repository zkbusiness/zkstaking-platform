import { PieChart, Pie, Cell } from "recharts";

export function PieChartTotalStaked({
  data,
  renderCustomizedLabel,
  COLORS,
}: any) {
  return (
    <PieChart width={270} height={270}>
      <Pie
        data={data}
        cx={130}
        cy={130}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
