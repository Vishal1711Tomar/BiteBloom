import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

const DishList = React.memo(({ dishes, onEdit, onDelete }) => {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          <img src={dish.image || "https://via.placeholder.com/150"} alt={dish.name} />
          <div>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>₹{dish.price}</strong></p>
            <button onClick={() => onEdit(dish)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(dish.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
});

function AdminDashboard() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      window.location.href = "/";
    } else {
      fetchDishes();
    }
  }, []);

  const fetchDishes = () => {
    axios.get("http://localhost:3001/dishes").then((res) => {
      setDishes(res.data);
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDish((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG image.");
    }
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price || !newDish.image) {
      alert("Please fill all required fields.");
      return;
    }

    axios.post("http://localhost:3001/dishes", { ...newDish, price: parseFloat(newDish.price) }).then(() => {
      setNewDish({ name: "", description: "", price: "", image: "" });
      fetchDishes();
    });
  };

  const handleEditDish = (dish) => {
    setNewDish(dish);
    setEditingId(dish.id);
  };

  const handleUpdateDish = () => {
    axios.put(`http://localhost:3001/dishes/${editingId}`, newDish).then(() => {
      setEditingId(null);
      setNewDish({ name: "", description: "", price: "", image: "" });
      fetchDishes();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      axios.delete(`http://localhost:3001/dishes/${id}`).then(() => fetchDishes());
    }
  };

  return (
    <div className="admin-container">
      <h2>🍽️ Admin Dish Management</h2>

      <div className="form-section">
        <input name="name" placeholder="Dish Name" value={newDish.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newDish.description} onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" value={newDish.price} onChange={handleChange} />

        {/* 📁 File upload input for PNG */}
        <input type="file" accept="image/png" onChange={handleImageUpload} />

        {/* 🖼️ Preview */}
        {newDish.image && (
          <img src={newDish.image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />
        )}

        {editingId ? (
          <button className="update-btn" onClick={handleUpdateDish}>Update Dish</button>
        ) : (
          <button className="add-btn" onClick={handleAddDish}>Add Dish</button>
        )}
      </div>

      <DishList dishes={dishes} onEdit={handleEditDish} onDelete={handleDelete} />
    </div>
  );
}

export default AdminDashboard;
