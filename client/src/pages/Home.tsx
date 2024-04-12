// import { Payment } from "../components/Payment";
import { Payment } from "../components/Payment";
import { ShowProducts } from "../components/ShowProducts";
// import CartProvider from "../context/CartContext";

export const Home = () => {
  //här ska alla produkter presenteras
  return (
    <div>
      <h1>Webbshop</h1>

        <ShowProducts />
        <Payment />
  
    </div>
  );
};
