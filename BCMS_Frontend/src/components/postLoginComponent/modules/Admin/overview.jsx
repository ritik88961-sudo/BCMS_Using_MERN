import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "../../../styles/post_login_styles/modules/admin.css"; // External CSS

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/sales")
      .then(response => setSalesData(response.data))
      .catch(error => console.error("Sales Fetch Error:", error));

    axios.get("http://localhost:5000/api/purchases")
      .then(response => setPurchaseData(response.data))
      .catch(error => console.error("Purchases Fetch Error:", error));
  }, []);

  // **Aggregation Function**
  const aggregateData = (data) => {
    const aggregated = {};

    data.forEach(({ product_name, qty, price }) => {
      if (!aggregated[product_name]) {
        aggregated[product_name] = { totalQty: 0, totalPrice: 0 };
      }
      aggregated[product_name].totalQty += qty;
      aggregated[product_name].totalPrice += qty * price;
    });

    return Object.entries(aggregated).map(([product, { totalQty, totalPrice }]) => ({
      product,
      totalQty,
      totalPrice,
    }));
  };

  const aggregatedSales = aggregateData(salesData);
  const aggregatedPurchases = aggregateData(purchaseData);

  // **Total Aggregated Values**
  const totalSoldItems = aggregatedSales.reduce((acc, item) => acc + item.totalQty, 0);
  const totalSalesAmount = aggregatedSales.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalPurchasedItems = aggregatedPurchases.reduce((acc, item) => acc + item.totalQty, 0);
  const totalPurchaseAmount = aggregatedPurchases.reduce((acc, item) => acc + item.totalPrice, 0);

  // **Aggregated Google Charts Data**
  const salesChartData = [
    ["Product", "Total Sales Amount"],
    ...aggregatedSales.map(({ product, totalPrice }) => [product, totalPrice]),
  ];

  const purchaseChartData = [
    ["Product", "Total Purchase Amount"],
    ...aggregatedPurchases.map(({ product, totalPrice }) => [product, totalPrice]),
  ];

  const pieChartData = [
    ["Type", "Amount"],
    ["Total Sales", totalSalesAmount],
    ["Total Purchases", totalPurchaseAmount],
  ];

  return (
    <div className="admin-dashboard-container">
      <h2>Dashboard</h2>
      
      <div className="stats">
        <p><strong>Total Sold Items:</strong> {totalSoldItems}</p>
        <p><strong>Total Sales Amount:</strong> ${totalSalesAmount.toFixed(2)}</p>
        <p><strong>Total Purchased Items:</strong> {totalPurchasedItems}</p>
        <p><strong>Total Purchase Amount:</strong> ${totalPurchaseAmount.toFixed(2)}</p>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Sales Chart</h3>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={salesChartData}
            options={{ title: "Sales Amount by Product" }}
          />
        </div>
        
        <div className="chart">
          <h3>Purchase Chart</h3>
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={purchaseChartData}
            options={{ title: "Purchase Amount by Product" }}
          />
        </div>
        
        <div className="chart">
          <h3>Sales vs Purchases</h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieChartData}
            options={{ title: "Sales vs Purchases" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
