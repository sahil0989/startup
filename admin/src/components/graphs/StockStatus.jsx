const StockStatus = ({ products }) => {
  const data = [
    { name: "Out of Stock", value: products.filter(p => p.stock === 0).length },
    { name: "Low Stock", value: products.filter(p => p.stock > 0 && p.stock <= 10).length },
    { name: "Healthy", value: products.filter(p => p.stock > 10).length },
  ];

  return (
    <ChartWrapper title="Stock Status">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
