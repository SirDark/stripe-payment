const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//this is a demo app so I am not checking if the frontend sends correct information but you should do it in a real app
const stripeController = async (req,res) => { 
    const {purchase, total_amount,shipping_fee} = req.body
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee
    };
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd'
    })
    console.log(paymentIntent);
    res.json({clientSecret: paymentIntent.client_secret})
}

module.exports = stripeController