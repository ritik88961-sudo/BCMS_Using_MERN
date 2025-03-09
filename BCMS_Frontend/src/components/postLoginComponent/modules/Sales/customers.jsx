import { useState, useEffect } from "react";
import "../../../styles/post_login_styles/modules/customers.css"; // Import CSS

const FetchCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers/") // Sample API
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(customers);
  return (
    <div className="container">
      <h1 className="title">Customers</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="grid">
          {customers.map((customer) => (
            <div key={customer.name} className="card">
              <h1>Name: {customer.customer_name}</h1>
              <h3>Phone: {customer.customer_phone}</h3>
              <p>Address: {customer.customer_address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchCustomers;
