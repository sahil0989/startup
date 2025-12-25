import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import { MdSearch } from "react-icons/md";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Catalogue() {

    const { allProducts } = useAuth();

    const categories = [
        "All",
        "Accessories",
        "Baby Clothing",
        "Bags",
        "Earrings",
        "Home Decor",
        "Toys",
    ];

    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const productsPerPage = 16;

    // Reset current page when filters or sorting change
    useEffect(() => {
        setCurrentPage(1);
    }, [category, sortBy]);

    // Filtering & Sorting
    const filteredProducts = useMemo(() => {
        let products = [...allProducts];

        // Filter by category
        if (category !== "All") {
            products = products.filter((p) => p.category === category);
        }

        // Filter by search query
        if (searchQuery.trim() !== "") {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort products
        if (sortBy === "az") {
            products.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (sortBy === "za") {
            products.sort((a, b) => b.name.localeCompare(a.name));
        }
        else if (sortBy === "low-high") {
            products.sort(
                (a, b) => Number(a.discountedPrice) - Number(b.discountedPrice)
            );
        }
        else if (sortBy === "high-low") {
            products.sort(
                (a, b) => Number(b.discountedPrice) - Number(a.discountedPrice)
            );
        }

        return products;
    }, [category, sortBy, searchQuery, allProducts]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        return filteredProducts.slice(start, end);
    }, [currentPage, filteredProducts]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search:", searchQuery);
    };

    return (
        <>
            <Navbar />

            <section>
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header>
                        <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                            Our Products
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-500">
                            Browse our premium crochet products and choose the perfect fit for you.
                        </p>
                    </header>

                    {/* Filters & Sorting */}
                    <div className="mt-10 sm:flex sm:items-center sm:justify-between gap-4">
                        {/* Category */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-10 min-w-[120px] rounded-sm border-gray-300 text-sm border-b-2"
                        >
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>

                        <div className="flex items-center gap-5">
                            {/* 🔍 Desktop Search Bar (new) */}
                            <form
                                onSubmit={handleSearch}
                                className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-300 focus-within:shadow-md"
                            >
                                <MdSearch size={20} className="text-gray-500 mr-2" />

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-sm w-24 py-1 focus:w-60 transition-all duration-300"
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
                    </div>

                    {/* Product Grid */}
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <li key={product.id} className="transition hover:-translate-y-1">
                                    <ProductCard product={product} />
                                </li>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No products found
                            </p>
                        )}
                    </ul>

                    {/* Optimized Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">

                            {/* Prev Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 border rounded disabled:opacity-40"
                            >
                                Prev
                            </button>

                            {(() => {
                                const pages = [];
                                const createBtn = (page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 border rounded text-sm ${currentPage === page
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );

                                // Always show first & last pages
                                const visiblePages = new Set([
                                    1,
                                    currentPage - 1,
                                    currentPage,
                                    currentPage + 1,
                                    totalPages
                                ]);

                                // Clean pages list
                                const sorted = [...visiblePages]
                                    .filter(p => p >= 1 && p <= totalPages)
                                    .sort((a, b) => a - b);

                                // Render pages with ellipsis
                                sorted.forEach((page, index) => {
                                    if (index > 0 && page - sorted[index - 1] > 1) {
                                        pages.push(
                                            <span key={`ellipsis-${page}`} className="px-2">…</span>
                                        );
                                    }
                                    pages.push(createBtn(page));
                                });

                                return pages;
                            })()}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 border rounded disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}