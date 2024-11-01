const express = require("express");
const router = express.Router();

// Sample product data
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 20,
    image:
      "https://media.wired.com/photos/62d75d34ddaaa99a1df8e61d/master/pass/Phone-Camera-Webcam-Gear-GettyImages-1241495650.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/05/30/118050.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 1,
    image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/05/30/118050.jpg",
  },
];

// GET products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
