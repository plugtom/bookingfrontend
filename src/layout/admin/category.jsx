import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState(null); // Initialize with null
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null); // State to store the id of the category being edited
const [editCategoryName, setEditCategoryName] = useState(""); 

  useEffect(() => {  fetchData();
  }, []);
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8234/admin/category", // Make sure the endpoint matches your server route
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data.categories)) {

        setCategory(response.data.categories); // Corrected to use 'categories'
        
      } else {
        console.error("Invalid data format from API");
        setAuthor([]);
      }

      } catch (error) {
        console.error("Error fetching data: ", error);
        setCategory([]); // Set to empty array on error
      }
    };

  

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8234/admin/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategory(category.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };
  const handleCreateCategory = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8234/admin/category",
        { name: newCategoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewCategoryName(""); // Clear input field
      fetchData(); // Refresh category list
    } catch (error) {
      console.error("Error creating category: ", error);
    }
  };
  const handleEdit = async (id, newName) => {
    try {
      let token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8234/admin/category/${id}`,
        { name: newName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategory(category.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        return item;
      }));
      setEditCategoryId(null); // Reset edit state
      setEditCategoryName(""); // Reset edit state
    } catch (error) {
      console.error("Error editing category: ", error);
    }
  };

  return (
    <div>
      <h2>Category</h2>
      <button onClick={() => setShowForm(true)}>Add Category</button>

      {showForm && (
        <div>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button onClick={handleCreateCategory}>Create</button>
        </div>
      )}
     
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID Category</th>
            <th>NAME</th>
            <th>COUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
        {category &&
  category.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        {editCategoryId === item.id ? (
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        ) : (
          item.name
        )}
      </td>
      <td>{item.count}</td>
      <td>
        {editCategoryId === item.id ? (
          <button onClick={() => handleEdit(item.id, editCategoryName)}>Save</button>
        ) : (
          <button onClick={() => {
            setEditCategoryId(item.id);
            setEditCategoryName(item.name);
          }}  className="bg-yellow-400" >Edit</button>
        )}
        <button className="bg-red-300 " onClick={() => handleDelete(item.id)}>Delete</button>
      </td>
    </tr>
  ))}
        </tbody>
      </table>
    </div>
  );
};
