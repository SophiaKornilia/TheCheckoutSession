import { Payment } from "../components/Payment";
import { ShowProducts } from "../components/ShowProducts";

export const Home = () => {
    //här ska alla produkter presenteras
  return (
    <div >
        <h1>Webbshop</h1>
        <Payment/> 
        <ShowProducts /> 
    </div>
  );
};
