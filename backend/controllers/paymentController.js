import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import Stripe from "stripe";
import catchAsyncErr from "../middleware/catchAsyncErr.js";
import ErrorHandler from "../utils/errorHandler.js";


// controller for payment
export const paymentController = catchAsyncErr(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const product = await Product.findById(req.body.product);
    const user = await User.findById(req.user._id);
    const address = await Address.findById(user.address);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
        cancel_url:`${req.protocol}://${req.get("host")}/cart/${req.body.product}`,
        user_email:user.email,
        user_reference_id:req.body.product,
    });

    // create new order in db 
    const newOrder = new Order({
        orderItems: [
            {
                name: product.name,
                image: product.image,
                price: product.price,
                product: product._id
            }
        ],
        shippingInfo: {
            address: user.address,
            city: user.city,
            postalCode: user.postalCode,
            country: user.country
        },
        paymentInfo: {
            id: session.id
        },
        itemsPrice: product.price,
        shippingPrice: 0,
        totalPrice: product.price,
        user: user._id
    })

    await newOrder.save();

    res.status(200).json({
        success: true,
        session,
        newOrder
    });
});
