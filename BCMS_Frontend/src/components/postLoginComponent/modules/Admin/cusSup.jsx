import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/post_login_styles/modules/CustomersSuppliers.css";

const CustomersSuppliers = () => {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get("http://localhost:5000/api/customers");
        const suppliersResponse = await axios.get("http://localhost:5000/api/suppliers");
        setCustomers(customersResponse.data);
        setSuppliers(suppliersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="customers-suppliers-container">
      <h2>Customers & Suppliers</h2>

      <div className="data-section">
        <div className="data-card">
          <h3>Customers</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.customer_name}</td>
                  <td>{customer.customer_phone}</td>
                  <td>{customer.customer_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-card">
          <h3>Suppliers</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.supplier_id}</td>
                  <td>{supplier.supplier_name}</td>
                  <td>{supplier.supplier_phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersSuppliers;
