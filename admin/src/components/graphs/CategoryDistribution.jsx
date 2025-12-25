import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const CategoryDistribution = ({ products }) => {
  const data = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { name: p.category, value: 0 };
      acc[p.category].value++;
      return acc;
    }, {})
  );

  return (
    <ChartWrapper title="Category Distribution">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
