import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/orders");
        const userOrders = res.data.filter((order) => order.userId === user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <p>Please log in to view your order history.</p>;

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>

      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <div className="order-meta">
                <strong>Date:</strong> {order.date} <br />
                <strong>Total:</strong> ₹{order.total}
              </div>
              <strong>Items:</strong>
              <ul className="order-items">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.qty}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;