// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const initStripe = require('../../stripe')
const fs = require('fs').promises


const createCheckoutSession = async (req, res) => {
    const cart = req.body 

    console.log(cart);

    const stripe = initStripe()

    const lineItems = cart.map(item => ({
        price: item.product,
        quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
        mode: "payment", //engångsbetalning
        customer: req.session.user.customerId, 
        line_items: lineItems, //produkterna som ska skickas
        success_url: "http://localhost:5173/Confirmed", 
        cancel_url: "http://localhost:5173/"
    })

    res.status(200).json({url:session.url, sessionId: session.id})
}

const verifySession = async (req, res) => {
    const stripe = initStripe()

    const sessionId = req.body.sessionId

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    //om det inte är betalt så skicka verified false och gå inte vidare
    if(session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

        const order = {
            //vi får ordna ordernumer själva - jag har gjort som Freddan
            orderNumber: Math.floor(Math.random() * 10000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        }

        const orders = JSON.parse(await fs.readFile("./data/orders.json"))
        orders.push(order)
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4))

        res.status(200).json({verified: true})
    }
} 

module.exports = {createCheckoutSession, verifySession}