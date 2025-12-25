const StatsCards = ({ products, collections }) => {
  const totalStock = products.reduce((a, p) => a + p.stock, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Products" value={products.length} />
      <Card title="Collections" value={collections.length} />
      <Card title="Total Stock" value={totalStock} />
      <Card title="Revenue Potential" value="₹ Calculated" />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
