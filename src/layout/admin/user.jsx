import React, { useState, useEffect } from "react";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8234/admin/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.user); // Assuming 'user' is the correct key in the response
    } catch (error) {
      console.error("Error fetching data: ", error);
      setUsers([]);
    }
  };

  const updateUserRole = async (id, newRole) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8234/admin/user/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      // Update the user list after successful update
      fetchData();
    } catch (error) {
      console.error("Error updating user role: ", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8234/admin/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      // Update the user list after successful deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <table style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Point</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.role}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
              <td>{user.point}</td>
              <td>
                <select
                  className={`input input-bordered w-full ${user.role === 'ADMIN' ? 'bg-blue-400' : user.role === 'USER' ? 'bg-yellow-400' : ''}`}
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                >
                  <option className="bg-blue-400" value="ADMIN">ADMIN</option>
                  <option className="bg-yellow-400" value="USER">USER</option>
                </select> 
                
              </td>
              <td className="bg-red-400">
                    <button  className="bg-red-600 w-full " onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
