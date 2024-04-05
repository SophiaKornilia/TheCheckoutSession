const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//hämtar alla produkter
const getProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            limit: 5,
            expand: ['data.default_price']
        });
        res.json(products.data); 
        // console.log(products.data);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({error: 'Could not fetch products'});
    }
} 

module.exports = {getProducts}


   
