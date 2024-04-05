import { useEffect, useState } from "react";
import "../App.css";

interface Product {
  id: number;
  images: string;
  name: string;
  description: string;
  active: boolean;
  default_price: {
    unit_amount: number;
  };
}

export const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    fetch("http://localhost:3000/fetch/getProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleClick = () => {
    fetch("http://localhost:3000/auth/isLoggedIn")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Authenticated") {
          console.log("Inloggad");
        } else {
          alert("You must log in to make a purchase");
        }
      })
      .catch((error) => {
        console.error("Error checking auth status", error);
      });      
  };

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
            <button onClick={handleClick}>Add to cart</button>
          </div>
        ) : null
      )}
    </div>
  );
};
