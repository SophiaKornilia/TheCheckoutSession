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

  return (
    <div className="product-container">
      {/* mapa igenom produkterna */}
      {products.map((product) =>
        product.active ? (
          <div className="product-card" key={product.id}>
           <h3>{product.name} </h3> 
           <p>{product.description}</p>
           <p>{product.default_price.unit_amount / 100}</p>
            <img className="product-image" src={product.images} alt={product.name}/>
          </div>
        ) : null
      )}
    </div>
  );
};
