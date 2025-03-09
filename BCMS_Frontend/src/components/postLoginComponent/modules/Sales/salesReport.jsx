import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const SalesReport = () => {
  const [profitLossData, setProfitLossData] = useState([]);

  const fetchData = async () => {
    try {
      const purchaseRes = await fetch("http://localhost:5000/api/purchases");
      const salesRes = await fetch("http://localhost:5000/api/sales/sales");

      const purchaseData = await purchaseRes.json();
      const salesData = await salesRes.json();

      calculateProfitLoss(purchaseData, salesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateProfitLoss = (purchases, sales) => {
    let profitLossMap = {};

    sales.forEach((sale) => {
      const purchase = purchases.find((p) => p.product_id === sale.product_id);

      if (purchase) {
        const productId = sale.product_id;

        if (!profitLossMap[productId]) {
          profitLossMap[productId] = {
            product: purchase.product_name,
            purchasePrice: purchase.price,
            salesPrice: sale.price,
            quantity: 0,
            profitLoss: 0,
          };
        }

        profitLossMap[productId].quantity += sale.qty;
        profitLossMap[productId].profitLoss +=
          (sale.price - purchase.price) * sale.qty;
      }
    });

    setProfitLossData(Object.values(profitLossMap));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h2>Profit & Loss Report</h2>

      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Purchase Price</th>
            <th>Sales Price</th>
            <th>Quantity Sold</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {profitLossData.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>${item.purchasePrice.toFixed(2)}</td>
              <td>${item.salesPrice.toFixed(2)}</td>
              <td>{item.quantity} PCS</td>
              <td
                style={{
                  color:
                    item.profitLoss > 0
                      ? "green"
                      : item.profitLoss < 0
                      ? "red"
                      : "black",
                  fontWeight: "bold",
                }}
              >
                ${item.profitLoss.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Chart
        width={"100%"}
        height={"400px"}
        chartType="ColumnChart"
        loader={<div>Loading Chart...</div>}
        data={[
          ["Product", "Profit/Loss", { role: "style" }], // 🛠 Role for color
          ...profitLossData.map((item) => [
            item.product,
            item.profitLoss,
            item.profitLoss >= 0 ? "green" : "red",
          ]),
        ]}
        options={{
          title: "Profit & Loss by Product",
          chartArea: { width: "70%" },
          hAxis: { title: "Product" },
          vAxis: { title: "Profit/Loss ($)" },
          legend: "none",
        }}
      />
    </div>
  );
};

export default SalesReport;
