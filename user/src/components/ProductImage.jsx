import React, { useEffect, useState } from 'react'

export default function ProductImage({ product }) {

    const [activeImage, setActiveImage] = useState(product.images[0].url);

    useEffect(() => {
        setActiveImage(product.images[0].url);
    }, [product])

    return (
        <>
            <div>
                {/* Main Image */}
                <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                    <img
                        src={activeImage}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-4 mt-4 overflow-x-auto">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt='alt'
                            onClick={() => setActiveImage(img.url)}
                            className={`w-24 h-24 rounded-md border object-cover cursor-pointer transition 
                ${activeImage === img ? "ring-2 ring-black" : "opacity-80 hover:opacity-100"}`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
