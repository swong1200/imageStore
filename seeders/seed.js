var mongoose = require("mongoose");
var db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imagestore", {
  useNewUrlParser: true,
});

var imageSeed = [
  {
    description: "Day At The Library",
    image: "/assets/images/1.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Forests Overhead",
    image: "/assets/images/2.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Brick Wall",
    image: "/assets/images/3.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Abstract Door In The Wall",
    image: "/assets/images/4.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Focused Ring",
    image: "/assets/images/5.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Taxi Cab",
    image: "/assets/images/6.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Building",
    image: "/assets/images/7.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Ethereal Pathway",
    image: "/assets/images/8.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Cutting The Ribbon On Opening Day",
    image: "/assets/images/9.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Skwad",
    image: "/assets/images/10.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Man On Bridge",
    image: "/assets/images/11.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Floating Book",
    image: "/assets/images/12.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Searching",
    image: "/assets/images/13.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Flyers On The Wall",
    image: "/assets/images/14.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Caution, Wet Floor",
    image: "/assets/images/15.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Sunset",
    image: "/assets/images/16.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Museum",
    image: "/assets/images/17.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Foggy Morning",
    image: "/assets/images/18.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Look Up",
    image: "/assets/images/19.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "City",
    image: "/assets/images/20.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Parking Garage",
    image: "/assets/images/21.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Giraffe",
    image: "/assets/images/22.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "On The Rocks",
    image: "/assets/images/23.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Airline Puddle",
    image: "/assets/images/24.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Good Boy",
    image: "/assets/images/25.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Grooves",
    image: "/assets/images/26.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Brick Photo",
    image: "/assets/images/27.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Blue",
    image: "/assets/images/28.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Count The Rings",
    image: "/assets/images/29.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Sewing",
    image: "/assets/images/30.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Ice Cream",
    image: "/assets/images/31.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Cactus",
    image: "/assets/images/32.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Hampster",
    image: "/assets/images/33.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Technology",
    image: "/assets/images/34.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Notre Dame",
    image: "/assets/images/35.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
  {
    description: "Railroad",
    image: "/assets/images/36.jpg",
    amount: 100,
    rating: 0,
    date: new Date(Date.now()),
  },
];

db.Image.deleteMany({})
  .then(() => db.Image.collection.insertMany(imageSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
