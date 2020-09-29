//Model
const Admin = require("../models/admin");
const Category = require("../models/category");

exports.create = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(admin => {
      const newCategory = new Category({
        category_name: req.body.category_name,
        created_by: admin.id
      });
      console.log(req.body.category_name);
      newCategory
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something"
          })
        );
    });
};

exports.get = (req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Category.find({ created_by: req.user.id })
    .then(() => {
      Category.findByIdAndUpdate(req.body.id, req.body)
        .then(category => res.json(category))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.delete = (req, res) => {
  Category.find({ created_by: req.user.id })
    .then(() => {
      Category.findByIdAndDelete(req.body.id)
        .then(category => res.json(category))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
