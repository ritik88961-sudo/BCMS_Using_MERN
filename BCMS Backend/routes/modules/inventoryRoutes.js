  const express = require("express");
  const Inventory = require("../../models/modules/inventoryModel");

  const router = express.Router();

  router.post("/inventory", async (req, res) => {
    try {
      const newInventory = new Inventory(req.body);
      const savedInventory = await newInventory.save();
      res.status(201).json(savedInventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/inventory", async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/inventory/:id", async (req, res) => {
    try {
      const inventoryItem = await Inventory.findOne({ inventory_id: req.params.id });
      if (!inventoryItem) return res.status(404).json({ error: "Inventory item not found" });
      res.status(200).json(inventoryItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/inventory/:id", async (req, res) => {
    try {
      req.body.updated_at = new Date(); // Update timestamp
      const updatedInventory = await Inventory.findOneAndUpdate(
        { product_id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedInventory) return res.status(404).json({ error: "Inventory item not found" });
      res.status(200).json(updatedInventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete("/inventory/:id", async (req, res) => {
    try {
      const deletedInventory = await Inventory.findOneAndDelete({ inventory_id: req.params.id });
      if (!deletedInventory) return res.status(404).json({ error: "Inventory item not found" });
      res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
