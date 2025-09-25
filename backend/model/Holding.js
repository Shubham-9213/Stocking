const mongoose=require("mongoose");
const {Holding}=require("../schema/HoldingSchema");

const Holdingmodel=mongoose.model("Holdingmodel",Holding);
module.exports={Holdingmodel};