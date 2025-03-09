const Purchase = require("../../models/modules/purchaseModel");

// Service to fetch all sales
const getAllPurchase = async () => {
  try {
    const allPurchase = await Purchase.find().exec();
    return allPurchase;
  } catch (error) {
    throw new Error("Error fetching Purchase data: " + error.message);
  }
};

// Service to fetch sales by specific filters
const getPurchaseByFilter = async (filters) => {
  try {
    const filteredPurchase = await Purchase.find(filters).exec();
    return filteredPurchase;
  } catch (error) {
    throw new Error("Error fetching filtered Purchase data: " + error.message);
  }
};

// Service to fetch sales from the last month
const getPurchaseLastMonth = async () => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1); // Go back one month

    const filteredPurchase = await Purchase.find({
      saleDate: { $gte: lastMonth },
    }).exec();

    return filteredPurchase;
  } catch (error) {
    throw new Error("Error fetching Purchase from last month: " + error.message);
  }
};
// Create a new purchase record
const createPurchase = async (data) => {
  try {
    // Destructure the data object to extract required fields
    const { 
      itemID, category, brand, color, quantity, unitPrice, purchaseDate, 
      supplier, paymentMethod, invoiceNo 
    } = data;

    // Calculate the total price (quantity * unitPrice)
    const totalPrice = quantity * unitPrice;

    // Create a new purchase record with the calculated total price
    const purchase = new Purchase({
      ...data,
      totalPrice, // Adding the calculated totalPrice to the data object
    });

    // Save the purchase record to the database
    return await purchase.save();
  } catch (error) {
    throw new Error("Error creating purchase: " + error.message);
  }
};


// Update an existing purchase record
const updatePurchase = async (purchaseID, data) => {
  return await PurchaseModel.findOneAndUpdate({ purchaseID }, data, { new: true });
};
module.exports = { getAllPurchase, getPurchaseByFilter, getPurchaseLastMonth,createPurchase,updatePurchase};
