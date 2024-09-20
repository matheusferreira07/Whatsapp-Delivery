// app.config.js ou app.json

export default {
    expo: {
        name: "delivery-whastapp",
        slug: "delivery-whastapp",
        extra: {
            stripePublicKey:  process.env.STRIPE_PUBLIC_KEY
        },
        orientation: "portrait",
        icon: "./assets/images/icon.png",
    }
}