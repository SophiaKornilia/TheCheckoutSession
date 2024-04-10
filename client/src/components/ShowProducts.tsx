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
  const [myCart, setMyCart] = useState<Product[]>([]); 
 

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


  // useEffect(() => {
  //   fetch("http://localhost:3000/fetch/getProducts")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => console.error("Error fetching products", error));
  // }, []);

  const handleClick = (product: Product) => {

    //Hur gör jag för att kolla inloggning? 
    // fetch("http://localhost:3000/auth/isLoggedIn")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.message === "Authenticated") {
    //       console.log("Inloggad");
    //     } else {
    //       alert("You must log in to make a purchase");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error checking auth status", error);
    //   });    

    //Skapar en ny array som jag lägger in objekten jag klickat på.
    const myNewCart = [...myCart, product]
    setMyCart(myNewCart)     
  };

  myCart.map((cartProduct) => {
    console.log("idem",cartProduct.id);
  })
  

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
            <button onClick={() => handleClick(product)}>Add to cart</button>
          </div>
        ) : null
      )}
    </div>
  );
};
