import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProductsOverTime = ({ products }) => {
  const data = Object.values(
    products.reduce((acc, p) => {
      const date = new Date(p.createdAt).toLocaleDateString();
      acc[date] = acc[date] || { date, count: 0 };
      acc[date].count++;
      return acc;
    }, {})
  );

  return (
    <ChartWrapper title="Products Over Time">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="count" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
