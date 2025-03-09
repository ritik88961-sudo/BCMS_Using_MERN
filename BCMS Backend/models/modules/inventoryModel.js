const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  quantity_in_stock: { type: Number, required: true },
  supplier_id: { type: String, required: true },
  price_per_unit: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now }
});

const Inventory = mongoose.model("Inventories", inventorySchema);
module.exports = Inventory;
