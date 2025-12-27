import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <>
      <Link to={`/product/${product?._id || ""}`} className="group block">
        <div className="relative">
          <img
            src={product.images[0].url}
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
            {product.name}
          </h3>

          {/* Prices */}
          <div className="flex items-center gap-2 mt-1">
            <p className="text-lg font-semibold text-gray-900">
              ₹{product.discountedPrice}
            </p>
            <p className="text-sm line-through text-gray-500">
              ₹{product.originalPrice}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
