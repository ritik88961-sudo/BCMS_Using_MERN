const express = require("express");
const Sales = require("../../models/modules/salesModel");
const Inventory = require("../../models/modules/inventoryModel");
const router = express.Router();

router.post("/sales", async (req, res) => {
  try {
    const { sale_date, customer_name, product_id, qty, price, total_amount, sold_by } = req.body;

    const inventoryItem = await Inventory.findOne({ product_id });
    if (!inventoryItem) {
      return res.status(404).json({ error: "Product not found in inventory" });
    }

    if (inventoryItem.quantity_in_stock < qty) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const newSale = new Sales({
      sale_date,
      customer_name,
      product_id,
      qty,
      price,
      total_amount,
      sold_by,
    });

    await newSale.save();

    inventoryItem.quantity_in_stock -= qty;
    inventoryItem.updated_at = new Date();
    await inventoryItem.save();

    res.status(201).json({ message: "Sale recorded successfully!", sale: newSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sales/limit-10", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;   // Default page = 1
    limit = parseInt(limit) || 10; // Default limit = 10

    const totalSales = await Sales.countDocuments(); // Count total sales
    const totalPages = Math.ceil(totalSales / limit);

    const sales = await Sales.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ sale_date: -1 }); // Sort by latest sales first

    res.status(200).json({
      totalSales,
      totalPages,
      currentPage: page,
      limit,
      sales,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/sales", async (req, res) => {
  try {
    const sales = await Sales.find(); // Sort by latest sales first

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sales/:id", async (req, res) => {
  try {
    const sale = await Sales.findOne({ sale_id: req.params.id });
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/sales/:id", async (req, res) => {
  try {
    const updatedSale = await Sales.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/sales/:id", async (req, res) => {
  try {
    const deletedSale = await Sales.findOneAndDelete({ sale_id: req.params.id });
    if (!deletedSale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
