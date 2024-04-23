import React, { useState, useEffect } from "react";
import axios from "axios";
import FormProduct from "./formProduct"; // Use uppercase for component names

export default function Product() {
  const [products, setProducts] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8234/admin/product",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data.products); // Assuming the response contains an array of products
    } catch (error) {
      console.error("Error fetching data: ", error);
      setProducts([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8234/admin/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEdit = async (id, newName) => {
    try {
      let token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8234/admin/product/${id}`,
        { name: newName }, // Assuming the API expects a payload with a 'name' field
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(products.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName }; // Update only the 'name' field
        }
        return item;
      }));
      setEditProductId(null);
      setEditProductName("");
    } catch (error) {
      console.error("Error editing product: ", error);
    }
  };

  return (
    <div>
      <h2>Product</h2>
      <button onClick={() => setShowForm(true)}>Add Product</button>

      {showForm && (
        <FormProduct fetchData={fetchData} />
      )}
     
      <table style={{ width: "90%" }}>
        <thead className="bg-slate-200">
          <tr className="">
            <th>ID Product</th>
            <th>Name</th>
            <th>Category Name</th>
            <th>Stock</th>
            <th>Title</th>
            <th>Price</th>
            <th>Detail</th>
            <th>Year Publication</th>
            <th>Number of Pages</th>
            <th>Product Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editProductId === item.id ? (
                  <input
                    type="text"
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                  />
                ) : (
                  item.title // Displaying title instead of name
                )}
              </td>
              <td>{item.category.name} 
              </td>
              <td>{item.stock}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.detail}</td>
              <td>{item.yearpublication}</td>
              <td>{item.numberpages}</td>
              <td><img src={item.Product_img[0].url} alt="Product Image" width="100" height="100" /></td>
              <td>
                {editProductId === item.id ? (
                  <button onClick={() => handleEdit(item.id, editProductName)}>Save</button>
                ) : (
                  <button onClick={() => {
                    setEditProductId(item.id);
                    setEditProductName(item.title); // Displaying title instead of name
                  }}>Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
  )
                }
