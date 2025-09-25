const mongoose=require("mongoose");
const Order=new mongoose.Schema({
    name:String,
    qty:String,
    price:String,
    model:String,
     date: { type: Date, default: Date.now }
})
module.exports={Order}