var db = require("../models");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const path = require("path");

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
    let name = req.body.itemname;
    let image = req.body.itemimage;
    let price = JSON.parse(req.body.itemprice);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              images: ["http://localhost:3001" + image],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3001/success.html`,
      cancel_url: `http://localhost:3001/cancel.html`,
    });
    res.json({ id: session.id });
  });
};
