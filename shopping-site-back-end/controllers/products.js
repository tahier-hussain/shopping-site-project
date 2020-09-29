//Model
const User = require("../models/user");
const Admin = require("../models/admin");
const Product = require("../models/product");
const Category = require("../models/category");

exports.create = (req, res) => {
  const file = req.files.file;
  console.log(file.data);
  file.mv(`/home/tahier/shopping-site/shopping-site-front-end/client/public/${file.name}`);
  Admin.findById(req.user.id)
    .select("-password")
    .then(admin => {
      const newProduct = new Product({
        product_title: req.body.product_title,
        product_description: req.body.product_description,
        created_by: admin.id,
        category: req.body.category_id,
        filename: file.name
      });

      newProduct
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  Product.find()
    .sort("-register_date")
    .then(products => res.json(products))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getCategoryProducts = (req, res) => {
  console.log(req.body.category_id);
  Product.find({ category: req.body.category_id })
    .then(products => res.json(products))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Product.find({ created_by: req.user.id })
    .then(() => {
      Product.findByIdAndUpdate(req.body.id, req.body)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.delete = (req, res) => {
  Product.find({ created_by: req.user.id })
    .then(() => {
      Product.findByIdAndDelete(req.body.id)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
