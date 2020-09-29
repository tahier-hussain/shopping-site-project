//Model
const User = require("../models/user");
const Post = require("../models/post");

exports.create = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new Post({
        post: req.body.post,
        user: user.id,
        product: req.body.product_id
      });

      newPost
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
  Post.find()
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getProductPosts = (req, res) => {
  Post.find({ product: req.body.product })
    .then(posts => res.json(posts))
    .catch(() => res.json({ status_code: 400, msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Post.find({ auth_id: req.user.id })
    .then(() => {
      Post.findByIdAndUpdate(req.body.id, req.body)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.delete = (req, res) => {
  Post.find({ auth_id: req.user.id })
    .then(() => {
      Post.findByIdAndDelete(req.body.id)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
