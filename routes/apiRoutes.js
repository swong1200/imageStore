var db = require("../models");

module.exports = function (app) {
  app.get("/api/images", function (req, res) {
    db.Image.find({}).then(function (dbImages) {
      res.json(dbImages);
    });
  });

  app.put("/api/images/:id", function (req, res) {
    db.Image.updateOne(
      { _id: req.params.id },
      { rating: req.body.rating }
    ).then(function (dbImage) {
      res.json(dbImage);
    });
  });

  app.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: "Stubborn Attachments",
    //           images: ["https://i.imgur.com/EHyR2nP.png"],
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${YOUR_DOMAIN}/success.html`,
    //   cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    // });
    res.json({ id: session.id });
  });
};
