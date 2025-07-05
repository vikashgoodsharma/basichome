import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useCart } from "@/components/CartContext";

export default function ProductDetail({ product }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const inCart = cart.some((item) => item.id === product.id);
  
  if (!product) return <p>Product not found.</p>;

  // Truncate description for meta tags (max 160 characters)
  const metaDescription = product.description.length > 160 
    ? product.description.substring(0, 157) + '...' 
    : product.description;

  return (
    <>
      <Head>
        {/* Basic SEO Meta Tags */}
        <title>{product.title} - BasicHome</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${product.category}, ${product.title}, online shopping, BasicHome`} />
        <meta name="author" content="BasicHome" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={product.image} />
       
       
    
        
      </Head>

      <div style={{ padding: "2rem" }}>
        <Link href="/">← Back to Products</Link>
        <h1 className="my-4 text-2xl font-bold text-center">{product.title}</h1>
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>
        <div className="text-center">
          <p className="my-2">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="my-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="my-2">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="my-2">
            <strong>Rating:</strong> {product.rating?.rate} ⭐ (
            {product.rating?.count} reviews)
          </p>
          <button
            onClick={() =>
              inCart ? removeFromCart(product.id) : addToCart(product)
            }
            aria-label="handle cart"
            style={{
              background: inCart ? "#f87171" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0.5rem 1.5rem",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    if (!product?.id) {
      return { notFound: true };
    }

    return {
      props: { product },
    };
  } catch (error) {
    return { notFound: true };
  }
}
