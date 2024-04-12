import { useEffect, useState } from "react";
import { IProduct, useCart } from "../context/CartContext";
import "../index.css";

export const ShowProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const {addToCart} = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/fetch/getProducts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product-container">
      {/* mapa igenom produkterna */}
      {products.map((product) =>
        product.active ? (
          <div className="product-card" key={product.id}>
            <h3>{product.name} </h3>
            <p>{product.description}</p>
            <p>{product.default_price.unit_amount / 100} sek</p>
            <img
              className="product-image"
              src={product.images}
              alt={product.name}
            />
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ) : null
      )}
    </div>
  );
};
