const mongoose=require("mongoose");
const Holding=new mongoose.Schema(
{
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
})
module.exports={Holding}