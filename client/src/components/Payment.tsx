export const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3000/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //se till att skicka med cookien till server
        //här ska mina objekt från myCart komma in
        body: JSON.stringify([
          {
            product: "price_1P1tGr2NLiGGPoBtWTFv0FdM",
            quantity: 3,
          },
          {
            product: "price_1P0n0q2NLiGGPoBtCK6KcjPY",
            quantity: 1,
          },
        ]),
      }
    );

    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
    // console.log(data);
  };

  return (
    <div>
      <button onClick={handlePayment}>GE MIG PENGAR!!</button>
    </div>
  );
};
