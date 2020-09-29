const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const fileUpload = require("express-fileupload");

//Body Parser
app.use(bodyParser.json());
app.use(fileUpload());

const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/admin-register", require("./routes/api/admin-register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/admin-login", require("./routes/api/admin-login"));
app.use("/api/auth", require("./routes/api/auth-user"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/product-orders", require("./routes/api/product-orders"));
app.use("/api/category", require("./routes/api/category"));
app.use("/api/cart", require("./routes/api/cart"));

const port = 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
