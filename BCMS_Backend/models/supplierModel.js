const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplier_id:{type:String,required:true},
  supplier_name: { type: String, required: true },
  supplier_phone: { type: String, required: true }
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
