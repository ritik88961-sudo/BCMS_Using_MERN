import { FaShoppingCart, FaPlus } from "react-icons/fa"; // Import Sale Icons
import "../../../styles/post_login_styles/modules/recordSale.css"; // Import CSS file
import { useEffect, useState } from "react";

export default function RecordSale() {
  const [customerList, setCustomerList] = useState([]); // Store Customers
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Selected Customer ID
  const [productList, setProductList] = useState([]); // Store Products
  const [selectedProduct, setSelectedProduct] = useState(""); // Selected Product ID
  const [showCustomerModal, setShowCustomerModal] = useState(false); // Toggle Add Customer Popup
  const [qty, setQty] = useState(""); // Quantity
  const [userList, setUserList] = useState([]);
  const [price, setPrice] = useState(""); // Price
  const [totalAmount, setTotalAmount] = useState(""); // Total Amount
  const [selectedUser, setSelectedUser] = useState();

  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  });
  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users/users")
      .then((res) => res.json())
      .then((data) => setUserList(data));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomerList(data))
      .catch((error) => console.error("Error fetching customers:", error));

    fetch("http://localhost:5000/api/inventory")
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.error("Error fetching products:", error));
    fetchUsers();
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const updateTotalAmount = (quantity, unitPrice) => {
    if (quantity && unitPrice) {
      setTotalAmount((quantity * unitPrice).toFixed(2));
    } else {
      setTotalAmount("");
    }
  };

  const handleQuantityChange = (event) => {
    const newQty = event.target.value;
    setQty(newQty);
    updateTotalAmount(newQty, price);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    updateTotalAmount(qty, newPrice);
  };

  const handleNewCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Customer Added Successfully!");
        setCustomerList([...customerList, result]); // Update Customer List
        setSelectedCustomer(result.customer_name); // Auto-select New Customer
        console.log(result.customer_name)
        setShowCustomerModal(false); // Close Modal
      } else {
        throw new Error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add customer. Please try again.");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const saleData = {
      sale_date: event.target.sale_date.value,
      customer_name: selectedCustomer,
      product_id: selectedProduct,
      qty: qty,
      price: price,
      total_amount: totalAmount,
      sold_by: selectedUser, // Change based on logged-in user
    };

    try {
      const response = await fetch("http://localhost:5000/api/sales/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        alert("Sale recorded successfully!");
        // Reset Form Fields
        setSelectedCustomer("");
        setSelectedProduct("");
        setQty("");
        setPrice("");
        setTotalAmount("");
      } else {
        throw new Error("Failed to record sale");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to record sale. Please try again.");
    }
  };

  return (
    <div className="sale-form-container">
      <h2>
        <FaShoppingCart style={{ marginRight: "10px" }} /> Record a Sale
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sale Date</label>
          <input type="date" name="sale_date" required />
        </div>

        <div className="form-group">
          <label>Customer</label>
          <div className="customer-dropdown">
            <select
              name="customer_name"
              value={selectedCustomer}
              onChange={handleCustomerChange}
              required
            >
              <option value="">Select Customer</option>
              {customerList.map((customer) => (
                <option
                  key={customer.customer_name}
                  value={customer.customer_name}
                >
                  {customer.customer_name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-customer-btn"
              onClick={() => setShowCustomerModal(true)}
            >
              <FaPlus /> Add
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Product</label>
          <select
            name="product_id"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {productList.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="qty"
            min="1"
            placeholder="Enter Quantity"
            value={qty}
            onChange={handleQuantityChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Enter Price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Amount</label>
          <input
            type="number"
            step="0.01"
            name="total_amount"
            placeholder="Total Amount"
            value={totalAmount}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Sold By</label>
          <select
            name="sold_by"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select Salesperson</option>
            {userList.map((user) =>
              user.role === "Sales Manager" ? (
                <option key={user._id} value={user.username}>
                  {user.first_name} ({user.username})
                </option>
              ) : (
                ""
              )
            )}
          </select>
        </div>

        <button type="submit" className="sale-btn">
          Submit Sale
        </button>
      </form>

      {showCustomerModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Customer</h3>
            <form onSubmit={handleNewCustomerSubmit}>
              <label>Customer Name</label>
              <input
                type="text"
                name="customer_name"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customer_name: e.target.value,
                  })
                }
                required
              />

              <label>Customer Phone</label>
              <input
                type="text"
                name="customer_phone"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customer_phone: e.target.value,
                  })
                }
                required
              />

              <label>Customer Address</label>
              <input
                type="text"
                name="customer_address"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customer_address: e.target.value,
                  })
                }
                required
              />

              <button type="submit" className="add-btn">
                Add Customer
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowCustomerModal(false)}
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
