const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErr(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ariyas",
        },
    });
    res.status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErr(async (req, res, next) => {
    res.status(200).json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY });
})

// cash on delivery

exports.cashOnDelivery = catchAsyncErr(async (req, res, next) => {
    res.status(200).json({ success: true, paymentMode: "Cash on Delivery" });
})