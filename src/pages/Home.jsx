import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function Home() {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const fetchDishes = () => {
    axios
      .get("http://localhost:3001/dishes")
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Failed to fetch dishes", err));
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (dish) => {
    if (!user) {
      alert("Please login or signup to add to cart.");
      navigate("/login");
      return;
    }

    const existing = cart.find((item) => item.id === dish.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...dish, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  const handleIncrease = (dishId) => {
    const updatedCart = cart.map((item) =>
      item.id === dishId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecrease = (dishId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const getCartQuantity = (dishId) => {
    const item = cart.find((item) => item.id === dishId);
    return item ? item.quantity : 0;
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h2 className="title">🍲 Our Menu</h2>
      <div className="dish-list">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => {
            const quantity = getCartQuantity(dish.id);
            return (
              <div key={dish.id} className="dish-card">
                <img src={dish.image} alt={dish.name} />
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <p>₹{dish.price}</p>

                {quantity === 0 ? (
                  <button onClick={() => handleAddToCart(dish)}>Add to Cart</button>
                ) : (
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(dish.id)}>➖</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleIncrease(dish.id)}>➕</button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No dishes found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}

export default Home;
