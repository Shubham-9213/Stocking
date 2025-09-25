const mongoose=require("mongoose");
const {Order}=require("../schema/Order");

const Ordermodel=mongoose.model("Ordermodel",Order);
module.exports={Ordermodel};