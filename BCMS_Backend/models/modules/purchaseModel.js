const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  purchase_date: { type: Date, required: true },
  supplier_id: { type: String, required: true },
  product_id:{type:String,required:true},
  product_name:{type:String,required:true},
  qty:{type:Number,required:true},
  price:{type:Number,required:true},
  total_amount: { type: mongoose.Types.Decimal128},
  purchased_by: { type: String, required: true }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
