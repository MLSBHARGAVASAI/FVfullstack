const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mlsbhargavasai5002:Mlsbrgv%23665@fvbackend.sx5im.mongodb.net/?retryWrites=true&w=majority&appName=FVbackend');
  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}


const cartSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: String,
    quantity: { type: Number, default: 1 },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;