import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export const Payment = () => {
  const { cart } = useCart();
  const { user } = useUser();

  const handlePayment = async () => {
    console.log("payment", cart);
    console.log(user);

    if (!user) {
      alert("You have to log in to make a purchase");
      return;
    }

    const cartItems = cart.map((item) => ({
      product: item.product.default_price.id,
      quantity: item.quantity,
    }));

    const response = await fetch(
      "http://localhost:3000/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //se till att skicka med cookien till server
        //här ska mina objekt från myCart komma in
        body: JSON.stringify(cartItems),
      }
    );

    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};
