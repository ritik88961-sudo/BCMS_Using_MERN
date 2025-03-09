import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "../../../styles/post_login_styles/modules/adminReport.css";

const AdminReport = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get("http://localhost:5000/api/sales/sales");
        const purchasesResponse = await axios.get("http://localhost:5000/api/purchases");
        setSales(salesResponse.data);
        setPurchases(purchasesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const calculateProfit = (saleItem) => {
    const purchaseItem = purchases.find((p) => p.product_id === saleItem.product_id);
    if (!purchaseItem) return 0;
    return (saleItem.price - purchaseItem.price) * saleItem.qty;
  };

  const filteredSales = sales.filter(
    (sale) =>
      (!filterDate || sale.sale_date.includes(filterDate)) &&
      (!filterUser || sale.sold_by.toLowerCase().includes(filterUser.toLowerCase()))
  );

  const filteredPurchases = purchases.filter(
    (purchase) =>
      (!filterDate || purchase.purchase_date.includes(filterDate)) &&
      (!filterUser || purchase.purchased_by.toLowerCase().includes(filterUser.toLowerCase()))
  );

  const totalProfit = filteredSales.reduce((acc, item) => acc + calculateProfit(item), 0);

  const chartData = [
    ["Item", "Profit"],
    ...filteredSales.map((sale) => [sale.product_id, calculateProfit(sale)]),
  ];

  return (
    <div className="admin-report-container">
      <h2>Admin Report</h2>
      <div className="filters">
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} placeholder="Filter by Date" />
        <input type="text" onChange={(e) => setFilterUser(e.target.value)} placeholder="Filter by Username" />
      </div>
      <h3>Total Profit: ₹{totalProfit}</h3>
      <Chart chartType="ColumnChart" data={chartData} width="100%" height="400px" legendToggle />
      
      <h3>Sales</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Sold By</th>
            <th>Sale Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product_id}</td>
              <td>{sale.sold_by}</td>
              <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td>{sale.qty}</td>
              <td>₹{sale.price}</td>
              <td>₹{calculateProfit(sale)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Purchases</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Purchased By</th>
            <th>Purchase Date</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.product_id}</td>
              <td>{purchase.purchased_by}</td>
              <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
              <td>{purchase.qty}</td>
              <td>₹{purchase.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReport;