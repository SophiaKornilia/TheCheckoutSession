const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {

    const cart = req.body
    const lineItems = cart.map(item => ({
        price: item.product,
        quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        mode: "payment", //engångsbetalning
        customer: customerId,
        line_items: lineItems, //produkterna som ska skickas
        success_url: "http://localhost:5173/Confimed", 
        cancel_url: "http://localhost:5173/"
    })

    res.status(200).json({url:session.url, sessionId: session.id})

}

module.exports = {createCheckoutSession}