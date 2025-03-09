import { useEffect, useState } from "react";
import { FaShoppingBag, FaEdit } from "react-icons/fa"; // Import Icons
import { Chart } from "react-google-charts"; // Import Google Charts
import "../../../styles/post_login_styles/modules/purchase.css"; // Import CSS file

const PurchaseList = () => {
  const [supplierIds, setSupplierIds] = useState([]); // Supplier IDs
  const [productIds, setProductIds] = useState([]); // Product IDs
  const [purchaser, setPurchaser] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null); // Selected Purchase for Editing
  const fetchSupplierIds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/suppliers/");
      const data = await response.json();
      setSupplierIds(data.map((ele) => ele.supplier_id));
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchProductIds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/");
      const data = await response.json();
      setProductIds(data.map((ele) => ele.product_id));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchPurchaser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/users");
      const data = await response.json();
      setPurchaser(
        data.map((ele) => (ele.role === "Purchase Manager" ? ele : ""))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchSupplierIds();
    fetchProductIds();
    fetchPurchaser();
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/api/purchases")
      .then((response) => response.json())
      .then((data) => {
        setPurchases(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setLoading(false);
      });
  }, []);

  const openEditModal = (purchase) => {
    setSelectedPurchase(purchase); // Set Selected Purchase
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedPurchase({
      ...selectedPurchase,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/purchases/${selectedPurchase._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPurchase),
        }
      );

      if (response.ok) {
        alert("Purchase Updated Successfully!");
        setShowModal(false); // Close Modal
        window.location.reload(); // Reload to Show Updated Data
      } else {
        throw new Error("Failed to update purchase");
      }
    } catch (error) {
      console.error("Error updating purchase:", error);
      alert("Failed to update purchase. Please try again.");
    }
  };

  return (
    <div className="purchase-list-container">
      <h2>
        <FaShoppingBag style={{ marginRight: "10px" }} /> Purchase Records
      </h2>
      {/* Purchase Table */}
      {loading ? (
        <p className="loading">Loading purchases...</p>
      ) : purchases.length === 0 ? (
        <p className="no-data">No purchases found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Purchase Date</th>
              <th>Supplier ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Purchased By</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase._id}</td>
                <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                <td>{purchase.supplier_id}</td>
                <td>{purchase.product_name}</td>
                <td>{purchase.qty}</td>
                <td>${parseFloat(purchase.price).toFixed(2)}</td>
                <td>${(purchase.qty * purchase.price).toFixed(2)}</td>
                <td>{purchase.purchased_by}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(purchase)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedPurchase && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Purchase Details</h3>
            <form onSubmit={handleUpdate}>
              <label>Purchase ID</label>
              <input
                type="text"
                name="purchase_id"
                value={selectedPurchase._id}
                readOnly
              />

              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={selectedPurchase.product_name}
                onChange={handleChange}
                required
              />
              <label>Product ID</label>
              <select
                name="product_id"
                value={selectedPurchase.product_id}
                onChange={handleChange}
              >
                <option value={selectedPurchase.product_id}>
                  {selectedPurchase.product_id}
                </option>
                {productIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
              <label>Supplier ID</label>
              <select
                name="supplier_id"
                value={selectedPurchase.supplier_id}
                onChange={handleChange}
              >
                <option value={selectedPurchase.supplier_id}>
                  {selectedPurchase.supplier_id}
                </option>
                {supplierIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
              <label>Purchased By</label>
              <select
                name="purchased_by"
                value={selectedPurchase.purchased_by}
                onChange={handleChange}
              >
                <option value={selectedPurchase.purchased_by}>
                  {selectedPurchase.purchased_by}
                </option>
                {purchaser.map((users) => (
                  <option key={users._id} value={users.username}>
                    {users.first_name}
                  </option>
                ))}
              </select>

              <label>Quantity</label>
              <input
                type="number"
                name="qty"
                value={selectedPurchase.qty}
                onChange={handleChange}
                required
              />

              <label>Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={selectedPurchase.price}
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
};

export default PurchaseList;
