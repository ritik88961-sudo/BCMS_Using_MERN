import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa"; // Import Icons
import "../../../styles/post_login_styles/modules/suppliers.css"; // Import CSS file

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [supplierData, setSupplierData] = useState({
    supplier_id: "",
    supplier_name: "",
    supplier_phone: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    fetch("http://localhost:5000/api/suppliers")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
        setLoading(false);
      });
  };

  const openModal = (supplier = null) => {
    setEditMode(!!supplier);
    setSupplierData(
      supplier || { supplier_id: "", supplier_name: "", supplier_phone: "" }
    );
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:5000/api/suppliers/${supplierData.supplier_id}`
      : "http://localhost:5000/api/suppliers";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        setShowModal(false);
        fetchSuppliers(); // Refresh Supplier List
      } else {
        console.error("Error saving supplier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="suppliers-container">
      <h2>Suppliers Management</h2>

      <button className="add-btn" onClick={() => openModal()}>
        <FaPlus /> Add Supplier
      </button>

      {loading ? (
        <p className="loading">Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <p className="no-data">No suppliers found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td>{supplier.supplier_id}</td>
                <td>{supplier.supplier_name}</td>
                <td>{supplier.supplier_phone}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openModal(supplier)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editMode ? "Edit Supplier" : "Add Supplier"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Supplier ID</label>
              <input
                type="text"
                name="supplier_id"
                value={supplierData.supplier_id}
                onChange={(e) =>
                  setSupplierData({
                    ...supplierData,
                    supplier_id: e.target.value,
                  })
                }
                required
                disabled={editMode} // Disable editing supplier ID
              />
              <label>Supplier Name</label>
              <input
                type="text"
                name="supplier_name"
                value={supplierData.supplier_name}
                onChange={(e) =>
                  setSupplierData({
                    ...supplierData,
                    supplier_name: e.target.value,
                  })
                }
                required
              />
              <label>Contact Details</label>
              <input
                type="text"
                name="supplier_phone"
                value={supplierData.supplier_phone}
                onChange={(e) =>
                  setSupplierData({
                    ...supplierData,
                    supplier_phone: e.target.value,
                  })
                }
                required
              />
              <button type="submit">{editMode ? "Update" : "Create"}</button>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
