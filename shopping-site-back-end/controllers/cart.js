//Model
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.create = (req, res) => {
  console.log("Hello");
  User.findById(req.user.id)
    .select("-password")
    .then(async user => {
      const newCartItem = new Cart({
        product: req.body.product,
        user: user.id,
        product_title: await Product.findById(req.body.product).then(data => {
          return data.product_title;
        }),
        product_description: await Product.findById(req.body.product).then(data => {
          return data.product_description;
        }),
        product_image: await Product.findById(req.body.product).then(data => {
          return data.filename;
        })
      });

      console.log(newCartItem);

      newCartItem
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.getUserCart = (req, res) => {
  Cart.find({ user: req.user.id })
    .then(cart => res.json(cart))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.deleteCartItem = (req, res) => {
  Cart.find({ user: req.user.id })
    .then(() => {
      Cart.findByIdAndDelete(req.body.id)
        .then(cartItem => res.json(cartItem))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
