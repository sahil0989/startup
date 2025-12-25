import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { MdSearch } from "react-icons/md";

export default function CategoriesPage() {
    const { id } = useParams();
    const { allProducts, collections } = useAuth();

    const [categoryData, setCategoryData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("none");
    const [categoryProducts, setCategoryProducts] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // 🔥 Filter + Sort (fixed useMemo)
    const filteredProducts = useMemo(() => {
        let products = [...categoryProducts];

        if (searchQuery.trim() !== "") {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (sortBy) {
            case "az":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "za":
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-high":
                products.sort((a, b) => Number(a.discountedPrice) - Number(b.discountedPrice));
                break;
            case "high-low":
                products.sort((a, b) => Number(b.discountedPrice) - Number(a.discountedPrice));
                break;
            default:
                break;
        }

        return products;
    }, [searchQuery, sortBy, categoryProducts]);

    // 🔥 Get category + products on load
    useEffect(() => {
        if (collections && allProducts && id) {
            const category = collections.find((col) => col._id === id);
            setCategoryData(category || null);

            if (category) {
                const products = allProducts.filter(
                    (p) => p.collection.name === category.name
                );
                setCategoryProducts(products);
                setCurrentPage(1);
            }
        }
    }, [id, collections, allProducts]);

    if (!categoryData)
        return <p className="text-center py-16">Loading Collection...</p>;

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const start = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(start, start + productsPerPage);

    return (
        <>
            <Navbar />

            {/* Header */}
            <div className="relative bg-gray-100">
                <img
                    src="https://res.cloudinary.com/dzqpvaxd7/image/upload/v1766674298/header-slides/izst8ocvhmpafvxuw7wo.jpg"
                    alt={categoryData.name}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">{categoryData.name}</h1>
                    <p className="mt-2 text-white max-w-xl">{categoryData.description}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Products in {categoryData.name}</h2>

                {/* Search + Sort */}
                <div className="mt-10 flex items-center justify-end gap-4">

                    {/* Search Bar */}
                    <form className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                        <MdSearch size={20} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none text-sm w-24 py-1 focus:w-60 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {/* Sorting */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 rounded-sm border-gray-300 text-sm border-b-2"
                    >
                        <option value="none">Sort By</option>
                        <option value="az">Title (A - Z)</option>
                        <option value="za">Title (Z - A)</option>
                        <option value="low-high">Price (Low to High)</option>
                        <option value="high-low">Price (High to Low)</option>
                    </select>
                </div>

                {/* Products */}
                {currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-10">

                                {/* Prev */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 border rounded disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                {/* Page Numbers with Ellipsis */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter((page) =>
                                        page === 1 ||
                                        page === totalPages ||
                                        Math.abs(page - currentPage) <= 1
                                    )
                                    .map((page, index, arr) => {
                                        const prev = arr[index - 1];
                                        const isGap = prev && page - prev > 1;

                                        return (
                                            <>
                                                {isGap && <span key={`gap-${page}`}>…</span>}
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-4 py-2 border rounded text-sm ${currentPage === page
                                                        ? "bg-gray-900 text-white"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            </>
                                        );
                                    })}

                                {/* Next */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 border rounded disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500 mt-10">No products found.</p>
                )}
            </div>

            <Footer />
        </>
    );
}
