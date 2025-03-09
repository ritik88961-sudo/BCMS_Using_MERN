import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "../../../styles/post_login_styles/modules/ItemRemaining.css";

const ItemRemaining = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inventory");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventory();
  }, []);

  const chartData = [
    ["Product", "Quantity in Stock"],
    ...inventory.map((item) => [item.product_name, item.quantity_in_stock]),
  ];

  return (
    <div className="item-remaining-container">
      <h2>Inventory Status</h2>
      <Chart chartType="BarChart" data={chartData} width="100%" height="400px" legendToggle />
      <table className="data-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity in Stock</th>
            <th>Price per Unit</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{item.quantity_in_stock}</td>
              <td>₹{item.price_per_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemRemaining;
