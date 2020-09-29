//Model
const User = require("../models/user");
const ProductOrders = require("../models/product-orders");
const Admin = require("../models/admin");
const Product = require("../models/product");

exports.create = async (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(async user => {
      console.log(user);
      const newProductOrder = await new ProductOrders({
        product: req.body.product,
        no_of_items: req.body.no_of_items,
        user: user.id,
        user_name: user.name,
        status: "Order Received"
      });

      var product = await Product.findById(req.body.product).then(data => {
        return data;
      });
      newProductOrder["product_name"] = await product.product_title;
      newProductOrder["product_description"] = await product.product_description;
      newProductOrder["product_image"] = await product.filename;

      await newProductOrder
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.ordersToBeDelivered = async (req, res) => {
  var obj = await ProductOrders.find({ status: { $ne: "Delivered" } }).then(productOrders => {
    return productOrders;
  });

  res.json(obj);
};

exports.ordersByOneUser = async (req, res) => {
  var obj = await ProductOrders.find({ user: req.user.id }).then(data => {
    return data;
  });

  // for (var i = 0; i < obj.length; i++) {
  //   obj[i]["product_image"] = await Product.findById(obj[i]["product"]).then(data => {
  //     return data.filename;
  //   });
  // }
  res.json(obj);
};

exports.ordersDelivered = (req, res) => {
  ProductOrders.find({ status: "Delivered" })
    .then(productOrders => res.json(productOrders))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.updateStatus = (req, res) => {
  Admin.findById(req.user.id).then(() => {
    ProductOrders.findByIdAndUpdate(req.body.id, req.body)
      .then(productOrder => res.json(productOrder))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.delete = (req, res) => {
  ProductOrders.findByIdAndDelete(req.body.id)
    .then(order => res.json(order))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
