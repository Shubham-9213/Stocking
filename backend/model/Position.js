const mongoose=require("mongoose");
const {positions}=require("../schema/PositionSchema");

const Positionmodel=mongoose.model("Positionmodel",positions);
module.exports={Positionmodel};