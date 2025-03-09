import { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/post_login_styles/modules/sales.css";

export default function SalesManagement() {
  const [salesData, setSalesData] = useState([]); // Initialize with an empty array
  const [filteredData, setFilteredData] = useState([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch sales data from server (on initial load and when page changes)
  useEffect(() => {
    fetchSalesData();
  }, []); // Only fetch on page change

  // Fetch paginated sales data from the backend
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/sales/sales/limit-10`
      );
      const data = response.data.sales; // Sales data for the current page
      console.log(data);
      setSalesData(data);
      setFilteredData(data); // Set filteredData as all sales initially
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

  // Filter data based on search query
  const filterData = (query) => {
    if (query === "") {
      setFilteredData(salesData); // If no query, show all data
    } else {
      const filtered = salesData.filter(
        (sale) =>
          sale.product_id.toLowerCase().includes(query.toLowerCase()) ||
          sale.customer_name.toLowerCase().includes(query.toLowerCase()) ||
          sale.sold_by.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="sale_management">
      <input
        type="text"
        id="searchInput"
        className="search-bar"
        placeholder="Search Sale...."
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="product_details">
        <h2>Product Sold</h2>
        <div className="product_table">
          <table className="product-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Quantity Sold</th>
                <th>Unit Price(USD)</th>
                <th>Total Price (USD)</th>
                <th>Seller Name</th>
                <th>Sale Date</th>
                <th>Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.product_id}</td>
                    <td>{sale.qty}</td>
                    <td>{sale.price}</td>
                    <td>{sale.total_amount}</td>
                    <td>{sale.sold_by}</td>
                    <td>
                      {new Date(sale.sale_date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{sale.customer_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No sales data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
