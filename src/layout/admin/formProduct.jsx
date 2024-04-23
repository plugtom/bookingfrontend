import React, { useState } from "react";
import axios from "axios";

export default function FormProduct({ fetchData }) {
  const [stock, setStock] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [numberpages, setNumberpages] = useState("");
  const [nameauthor, setNameauthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState("");
  const [yearpublication, setYearpublication] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateProduct = async () => {
    try {
      let token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("stock", stock);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("detail", detail);
      formData.append("numberpages", numberpages);
      formData.append("nameauthor", nameauthor);
      formData.append("categoryId", categoryId);
      formData.append("images", images);
      formData.append("yearpublication", yearpublication);
      formData.append("image", selectedFile); // Append the selected file to the form data

      await axios.post(
        "http://localhost:8234/admin/product",
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
      setStock("");
      setTitle("");
      setPrice("");
      setDetail("");
      setNumberpages("");
      setNameauthor("");
      setCategoryId("");
      setImages("");
      setYearpublication("");
      setSelectedFile(null); // Reset selected file state
      fetchData(); // Call fetchData from props
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Enter stock"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
      <input
        type="text"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Enter detail"
      />
      <input
        type="text"
        value={numberpages}
        onChange={(e) => setNumberpages(e.target.value)}
        placeholder="Enter number of pages"
      />
      <input
        type="text"
        value={nameauthor}
        onChange={(e) => setNameauthor(e.target.value)}
        placeholder="Enter author name"
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Enter category ID"
      />
      <input
        type="file" // Use type="file" for file input
        onChange={handleFileChange} // Call handleFileChange when file input changes
      />
      <input
  type="date"
  id="yearpublication"
  value={yearpublication}
  onChange={(e) => setYearpublication(e.target.value)}
  placeholder="Enter year of publication"
/>

      
      <button onClick={handleCreateProduct}>Create</button>
    </div>
  );
}
