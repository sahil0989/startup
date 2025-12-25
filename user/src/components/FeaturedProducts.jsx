import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FeaturedProducts() {

    const { allProducts } = useAuth(); // Assuming this contains all products
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            // Shuffle the products array
            const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
            // Take first 8 products
            setRandomProducts(shuffled.slice(0, 8));
        }
    }, [allProducts]);


    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-3xl/tight font-semibold text-gray-900 sm:text-4xl">
                        Featured Products
                    </h2>
                </header>

                <ul className="mt-8 grid gap-8 grid-cols-2 lg:grid-cols-4">
                    {randomProducts?.map((product) => {
                        const discount = Math.round(
                            ((product?.originalPrice - product?.discountedPrice) / product?.originalPrice) * 100
                        );

                        return (
                            <li key={product?._id}>
                                <Link to={`/product/${product?._id}`} className="group block">
                                    <div className="relative">
                                        {/* Use the first image as the thumbnail */}
                                        <img
                                            src={product?.images[0].url}
                                            alt={product.name}
                                            className="aspect-square w-full rounded-md object-cover"
                                        />

                                        {/* Discount badge */}
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                            {discount}% OFF
                                        </span>
                                    </div>

                                    <div className="mt-3">
                                        <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                            {product?.name}
                                        </h3>

                                        {/* Prices */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-lg font-semibold text-gray-900">
                                                ₹{product?.discountedPrice}
                                            </p>
                                            <p className="text-sm line-through text-gray-500">
                                                ₹{product?.originalPrice}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="w-full flex justify-center items-center h-24">
                    <Link to={`/catalogue`} className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 duration-200">
                        See More
                    </Link>
                </div>

            </div>
        </section>
    );
}