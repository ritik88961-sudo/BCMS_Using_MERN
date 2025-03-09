const Sales = require("../../models/modules/salesModel");

const getAllSales = async (page, limit) => {
  try {
    const sales = await Sales.find()
    return sales;
  } catch (error) {
    throw new Error("Error fetching sales data: " + error.message);
  }
};

// Service to fetch sales by specific filters
const getSalesByFilter = async (filters) => {
  try {
    const filteredSales = await Sales.find(filters).exec();
    return filteredSales;
  } catch (error) {
    throw new Error("Error fetching filtered sales data: " + error.message);
  }
};

// Service to fetch sales from the last month
const getSalesLastMonth = async () => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1); // Go back one month

    const filteredSales = await Sales.find({
      saleDate: { $gte: lastMonth },
    }).exec();

    return filteredSales;
  } catch (error) {
    throw new Error("Error fetching sales from last month: " + error.message);
  }
};
const createSales = async (data) => {
  try {
    // Destructure the data object to extract required fields
    const { 
      DateOfSale,category,customerEmail,customerName,customerPhone,itemBrand,itemName,sellerID,sellerName,unitPrice,invoiceNo,itemID,quantity,subcategory
    } = data;

    // Ensure all required fields are present
    if (!itemID || !itemName || !category || !DateOfSale || !customerEmail || !customerName || 
        !customerPhone || !itemBrand || !sellerID || !sellerName || !invoiceNo || !subcategory) {
      throw new Error("All fields except totalPrice are required.");
    }

    // Calculate the total price (quantity * unitPrice)
    const totalPrice = quantity * unitPrice;

    // Create a new sales record with the calculated totalPrice
    const sales = new SalesModel({
      ...data,
      totalPrice, // Adding the calculated totalPrice to the data object
    });

    // Save the sales record to the database
    return await sales.save();
  } catch (error) {
    throw new Error("Error creating sales: " + error.message);
  }
};
// Update an existing sale record
const updateSale = async (invoiceNo, data) => {
  return await SalesModel.findOneAndUpdate({ invoiceNo }, data, { new: true });
};


module.exports = { getAllSales, getSalesByFilter, getSalesLastMonth ,createSales,updateSale};
