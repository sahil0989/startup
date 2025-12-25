import { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Navbar from "../components/Navbar";

const API = `${process.env.REACT_APP_API_URL}/api`;

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsRes, collectionsRes] = await Promise.all([
                    axios.get(`${API}/products`, { withCredentials: true }),
                    axios.get(`${API}/collections`, { withCredentials: true })
                ]);

                setProducts(productsRes.data.products || productsRes.data);
                setCollections(collectionsRes.data);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
                <StatsCards
                    totalProducts={products.length}
                    totalCollections={collections.length}
                />

                <CategoryWiseProducts products={products} />
            </div>
        </>
    );
}

/* ======================= STATS CARDS ======================= */

const StatsCards = ({ totalProducts, totalCollections }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Collections" value={totalCollections} />
    </div>
);

const StatCard = ({ title, value }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
        <p className="text-gray-500 text-sm sm:text-base">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
    </div>
);

/* ======================= CATEGORY WISE PRODUCTS ======================= */

const CategoryWiseProducts = ({ products }) => {
    const categoryData = Object.values(
        products.reduce((acc, product) => {
            const category = product.category || "Uncategorized";
            acc[category] = acc[category] || {
                name: category,
                value: 0
            };
            acc[category].value += 1;
            return acc;
        }, {})
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow w-full max-w-4xl mx-auto">
            <h2 className="font-semibold mb-4 text-base sm:text-lg text-center sm:text-left">
                Products per Category
            </h2>

            <div className="w-full h-[260px] sm:h-[300px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="70%"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
