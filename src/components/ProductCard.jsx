import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import ImageWrapper from "./ImageWrapper";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const inCart = cart.some((item) => item.id === product.id);
  return (
    <div key={product.id} className="border border-gray-300 rounded-md p-4">
      <ImageWrapper
        src={product.image}
        alt={product.title}
        objectFit="contain"
      />

      <h3>{product.title.substring(0, 25)}...</h3>
      <p className="my-2 text-right">
        <strong>${product.price}</strong>
      </p>
      <div className="flex justify-between">
        <Link
          href={`/products/${product.id}`}
          className="text-[#0000FF] self-center"
        >
          View Details
        </Link>
        <button
          onClick={() =>
            inCart ? removeFromCart(product.id) : addToCart(product)
          }
          className={`text-white border-none rounded px-3 py-1 cursor-pointer ${
            inCart ? "bg-red-400" : "bg-blue-600"
          }`}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
