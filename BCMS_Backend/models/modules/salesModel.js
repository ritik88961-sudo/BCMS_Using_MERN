const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  sale_date: { type: Date, required: true },
  customer_name: { type: String, required: true },
  total_amount: { type:Number, required: true },
  product_id: { type: String, required: true },
  qty:{type:Number,required:true},
  price:{type:Number,required:true},
  sold_by: { type: String, required: true }
});

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
