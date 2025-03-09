import { useEffect, useState } from "react";
import { FaBoxOpen, FaEdit } from "react-icons/fa"; // Icons
import "../../../styles/post_login_styles/modules/inventory.css"; // Import CSS
import { Chart } from "react-google-charts"; // Google Charts

export default function RemainingItems() {
  const [inventory, setInventory] = useState([]); // Store Inventory Data
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected Product for Editing

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      });
  }, []);

  const openEditModal = (product) => {
    setSelectedProduct(product); // Set Selected Product
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/inventory/${selectedProduct.product_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProduct),
        }
      );

      if (response.ok) {
        alert("Product Updated Successfully!");
        setShowModal(false); // Close Modal
        window.location.reload(); // Reload to Show Updated Data
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const pieChartData = [["Product Name", "Quantity in Stock"]];
  inventory.forEach((item) => {
    pieChartData.push([item.product_name, item.quantity_in_stock]);
  });

  return (
    <div className="inventory-container">
      <h2>
        <FaBoxOpen style={{ marginRight: "10px" }} /> Remaining Inventory
      </h2>

      {/* Inventory Table */}
      {loading ? (
        <p className="loading">Loading inventory...</p>
      ) : inventory.length === 0 ? (
        <p className="no-data">No items in inventory.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity in Stock</th>
              <th>Supplier ID</th>
              <th>Price per Unit</th>
              <th>Last Updated</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.quantity_in_stock}</td>
                <td>{item.supplier_id}</td>
                <td>${parseFloat(Number(item.price_per_unit)).toFixed(2)}</td>
                <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(item)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Google Pie Chart for Remaining Items */}
      <div className="chart-container">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={pieChartData}
          options={{
            title: "Remaining Inventory Items",
            is3D: true,
            pieSliceText: "value",
            legend: { position: "right" },
            colors: ["#007bff", "#28a745", "#dc3545", "#ffc107", "#6c757d"],
          }}
        />
      </div>

      {showModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product Details</h3>
            <form onSubmit={handleUpdate}>
              <label>Product ID</label>
              <input
                type="text"
                name="product_id"
                value={selectedProduct.product_id}
                readOnly
              />

              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={selectedProduct.product_name}
                onChange={handleChange}
                required
              />

              <label>Quantity</label>
              <input
                type="number"
                name="quantity_in_stock"
                value={selectedProduct.quantity_in_stock}
                onChange={handleChange}
                required
              />

              <label>Price per Unit</label>
              <input
                type="number"
                step="0.01"
                name="price_per_unit"
                value={selectedProduct.price_per_unit}
                onChange={handleChange}
                required
              />

              <button type="submit">Update</button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
