import React from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      borderBottom: "1px solid #eee",
      marginBottom: "2rem"
    }}>
      <Link href="/" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        BasicHome
      </Link>
      <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>🛒</span>
        <span style={{
          background: "#f87171",
          color: "white",
          borderRadius: "50%",
          padding: "0.25em 0.6em",
          fontSize: "1rem",
          fontWeight: "bold"
        }}>{cartCount}</span>
      </Link>
    </header>
  );
} 