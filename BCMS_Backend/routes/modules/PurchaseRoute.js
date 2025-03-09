const express = require("express");
const Purchase = require("../../models/modules/purchaseModel");
const Inventory = require("../../models/modules/inventoryModel")
const router = express.Router();
const Product = require("../../models/productModel")

router.post("/purchases", async (req, res) => {
  try {
    const { purchase_date, supplier_id, product_id, product_name, qty,price, purchased_by } = req.body;
    const total_amount = (qty*price);
    const newPurchase = new Purchase({
      purchase_date,
      supplier_id,
      product_id,
      product_name,
      qty,
      price,
      total_amount,
      purchased_by
    });

    await newPurchase.save();

    const existingProductInInventory = await Inventory.findOne({ product_name });
    const existingProductInProduct = await Product.findOne({product_name})
    if(!existingProductInProduct){
      const newProduct = new Product({
        product_id,
        product_name,
      })
      await newProduct.save();
    }

    if (existingProductInInventory) {
      existingProductInInventory.quantity_in_stock = Number(existingProductInInventory.quantity_in_stock) + Number(qty);
      existingProductInInventory.updated_at = new Date();
      await existingProductInInventory.save();
    } else {
      const newInventory = new Inventory({
        product_id,
        product_name,
        quantity_in_stock: qty,
        supplier_id,
        price_per_unit: price,
        updated_at: new Date()
      });

      await newInventory.save();
    }

    res.status(201).json({ message: "Purchase added & Inventory updated successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/purchases/:id", async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ purchase_id: req.params.id });
    if (!purchase) return res.status(404).json({ error: "Purchase not found" });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/purchases/:id", async (req, res) => {
  try {
    const updatedPurchase = await Purchase.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPurchase) return res.status(404).json({ error: "Purchase not found" });
    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/purchases/:id", async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findOneAndDelete({ purchase_id: req.params.id });
    if (!deletedPurchase) return res.status(404).json({ error: "Purchase not found" });
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
