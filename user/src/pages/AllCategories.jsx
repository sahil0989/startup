import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function AllCategories() {

    const { collections } = useAuth();
    const [collectionData, setCollectionData] = useState([]);

    useEffect(() => {
        setCollectionData(collections);
    }, [collections])

    return (
        <>
            <Navbar />

            <div className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className='flex justify-center'>
                        <div className='w-full'>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                                Our Collections
                            </h2>
                            <p className="text-gray-600">
                                Explore our wide range of categories crafted to suit your needs.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {collectionData.map((category, index) => (
                            <Link to={`/collection/${category?._id}`}
                                key={index}
                                className="relative group rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={category?.image}
                                    alt={category?.name}
                                    className="w-full h-52 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Title */}
                                <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-md md:text-lg font-semibold text-center px-2 drop-shadow-lg">
                                    {category?.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}
