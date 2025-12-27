import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import { FiShare2 } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function ProductPage() {
    const { id } = useParams();
    const { allProducts, loadingData } = useAuth();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        if (allProducts && id) {
            const product = allProducts.find((p) => p._id === id);
            setProductData(product || null);
        }
    }, [id, allProducts]);


    // Calculate discount
    const discount = Math.round(
        ((productData.originalPrice - productData.discountedPrice) / productData.originalPrice) * 100
    );

    if (loadingData) {
        return <Loader />;
    }

    if (!productData) return <p className="text-center py-16">Loading product...</p>;

    return (
        <>
            <Navbar />

            <div className="bg-gray-50 min-h-screen py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT — Product Images */}
                    <ProductImage product={productData} />

                    {/* RIGHT — Product Details */}
                    <div className="space-y-6">

                        {/* Share Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link Copied!");
                                }}
                                className="flex items-center gap-2 text-gray-600 hover:text-black transition"
                            >
                                <FiShare2 size={22} />
                                <span className="text-sm font-medium hidden sm:block">Share</span>
                            </button>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-black">₹{productData.discountedPrice}</p>
                            <p className="text-lg text-gray-500 line-through">₹{productData.originalPrice}</p>
                            <span className="text-green-600 font-semibold">{discount}% Off</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">{productData.description}</p>

                        {/* Material */}
                        <p className="text-gray-700">
                            <span className="font-semibold">Dimensions:</span> {productData.dimensions}
                        </p>

                        {/* Stock */}
                        {/* <p className="text-gray-700">
                            <span className="font-semibold">Stock:</span> {productData.stock}
                        </p> */}

                        {/* Buy Button */}
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://wa.me/919813609829?text=Hi%20I%20want%20to%20buy%20this%20product"
                                target="_blank"
                                rel="noopener noreferrer">
                                <button className="border border-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                                    Buy Now
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                <div className="max-w-7xl mx-auto mt-16 px-4 md:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allProducts
                            .filter((p) => p._id !== productData._id)
                            .slice(0, 8)
                            .map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))}
                    </ul>
                </div>
            </div>

            <Footer />
            <Toaster richColors position="bottom-right" />
        </>
    );
}
