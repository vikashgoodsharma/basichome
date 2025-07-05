// pages/products.js
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function ProductsPage({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("some error");
        const result = await response.json();
        console.log("resul", result);
      } catch (err) {
        console.log("error encountered", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="font-bold text-2xl text-center my-6">Product List</h1>
      
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-center mb-4 text-gray-600">
          Found {filteredProducts?.length || 0} product{filteredProducts?.length !== 1 ? 's' : ''}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No results message */}
      {searchTerm && filteredProducts?.length === 0 && (
        <p className="text-center mt-8 text-gray-500">
          No products found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  console.log("producrs", products);
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
