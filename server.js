var express = require("express");
var mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51IAM5zJXFwKf0sIhGTMA7iG9KnNcmBbIkISmEXAe8KyLsEfK8r3ROdILEuUrNNjjfZFRTNVwwSZG7YUAnjznMOR500UhnGi7zg"
);

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imagestore", {
  useNewUrlParser: true,
});

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});
