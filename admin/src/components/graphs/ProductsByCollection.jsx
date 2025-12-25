import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProductsByCollection = ({ collections }) => (
  <ChartWrapper title="Products Per Collection">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={collections}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="productCount" />
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);
