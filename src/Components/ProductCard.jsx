import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // Safe values
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const rating = Number(product?.rating) || 0;

  // Discount %
  const discountRate =
    discount > price
      ? Math.round(((discount - price) / discount) * 100)
      : 0;

  return (
    <div className="group border border-gray-100 bg-white p-3 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">

        {/* Discount Badge */}
        {discountRate > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-md">
            -{discountRate}%
          </span>
        )}

        {/* Stock Badge */}
        {product?.inStock ? (
          <span className="absolute top-3 right-3 z-10 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-md">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 right-3 z-10 bg-gray-500 text-white text-[10px] px-2 py-1 rounded-md">
            Out Stock
          </span>
        )}

        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">

        {/* Category */}
        <span className="text-xs uppercase tracking-wider text-emerald-500 font-semibold">
          {product?.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-zinc-800 line-clamp-1">
          {product?.name}
        </h3>

        {/* Brand */}
        <p className="text-sm text-zinc-400">
          Brand: {product?.brand}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">

          <span className="text-[#05a845] font-bold text-xl">
            ${price.toFixed(2)}
          </span>

          {discount > price && (
            <span className="text-gray-400 line-through text-sm">
              ${discount.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">

          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.round(rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}

          <span className="text-gray-500 text-xs ml-1">
            ({rating} / 5)
          </span>
        </div>

        {/* Quantity */}
        <p className="text-sm text-zinc-500">
          Quantity: {product?.quantity}
        </p>
      </div>
    </div>
  );
};


export default ProductCard;