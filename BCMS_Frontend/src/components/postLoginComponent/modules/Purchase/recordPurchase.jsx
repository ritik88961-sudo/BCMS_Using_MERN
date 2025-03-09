import { useState, useEffect } from "react";
import "../../../styles/post_login_styles/modules/purchase.css"; // Import CSS file

const PurchaseForm = () => {
  const [supplierIds, setSupplierIds] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [purchaser, setPurchaser] = useState([]);

  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
  });

  const [formData, setFormData] = useState({
    purchase_date: "",
    supplier_id: "",
    product_id: "",
    product_name: "",
    qty: "",
    price: "",
    purchased_by: "",
  });

  // 📌 Fetch Supplier IDs
  useEffect(() => {
    fetch("http://localhost:5000/api/suppliers/")
      .then((response) => response.json())
      .then((data) => setSupplierIds(data.map((ele) => ele.supplier_id)))
      .catch((error) => console.error("Error fetching suppliers:", error));

    fetch("http://localhost:5000/api/products/")
      .then((response) => response.json())
      .then((data) => setProductIds(data.map((ele) => ele.product_id)))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:5000/api/users/users")
      .then((response) => response.json())
      .then((data) =>
        setPurchaser(data.filter((ele) => ele.role === "Purchase Manager"))
      )
      .catch((error) => console.error("Error fetching purchasers:", error));
  }, []);

  // 📌 Fetch Product Name Based on Selected Product ID
  const fetchProductName = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data.product_name);
      setFormData({
        ...formData,
        product_id: id,
        product_name: data.product_name,
      });
    } catch (error) {
      console.error("Error fetching product name:", error);
    }
  };

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Handle Purchase Submission
  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Purchase Entry Recorded Successfully!");
        setFormData({
          purchase_date: "",
          supplier_id: "",
          product_id: "",
          product_name: "",
          qty: "",
          price: "",
          purchased_by: "",
        }); // Reset Form
      } else {
        throw new Error("Failed to submit purchase entry");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to submit purchase entry. Please try again.");
    }
  };

  // 📌 Handle New Product Submission
  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("✅ Product Added Successfully!");
        fetch("http://localhost:5000/api/products/")
          .then((response) => response.json())
          .then((data) => setProductIds(data.map((ele) => ele.product_id)));

        setShowProductModal(false);
        setSelectedProduct(newProduct.product_id);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to add product. Please try again.");
    }
  };

  return (
    <div className="purchase-form-container">
      <h2>Purchase Entry Form</h2>
      <form onSubmit={handlePurchaseSubmit}>
        <div className="form-group">
          <label>Purchase Date</label>
          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Supplier ID</label>
          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Supplier</option>
            {supplierIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product ID</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={(e) => fetchProductName(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {productIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-product-btn"
            onClick={() => setShowProductModal(true)}
          >
            + Add Product
          </button>
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={selectedProduct}
            readOnly
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Purchased By</label>
          <select
            name="purchased_by"
            value={formData.purchased_by}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {purchaser.map((user) => (
              <option key={user._id} value={user.username}>
                {user.first_name + " | " + user.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Purchase</button>
      </form>

      {showProductModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={handleNewProductSubmit}>
              <label>Product ID</label>
              <input
                type="text"
                name="product_id"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, product_id: e.target.value })
                }
                required
              />

              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, product_name: e.target.value })
                }
                required
              />

              <button type="submit">Add Product</button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowProductModal(false)}
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

export default PurchaseForm;
