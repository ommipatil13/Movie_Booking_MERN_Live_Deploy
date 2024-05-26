import Express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const stripeApi = stripe(process.env.PAYMENT_SECRET_KEY)

const paymentRouter = Express.Router();

paymentRouter.post('/', async (req, res) => {

    const product = await stripeApi.products.create({
        name: "film"
    })

    if (product) {
        var price = await stripeApi.prices.create({
            product: `${product.id}`,
            unit_amount: 50 * 50,
            currency: 'usd',

        })
    }

    if (price.id) {
        var session = await stripeApi.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/user',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: 'test@check.com',
        })

    }

    res.json(session)



});

export default paymentRouter;
