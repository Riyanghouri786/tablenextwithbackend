"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const apiURL = "/api/users";
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiURL, newUser);
      setData([...data, response.data.user]);
      setNewUser({ name: "", email: "", password: "" });
      toggleModal();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={toggleModal}
      >
        Add User
      </button>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          maxWidth: "600px",
          textAlign: "left",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th
              style={{ padding: "12px", fontWeight: "600", fontSize: "16px" }}
            >
              Name
            </th>
            <th
              style={{ padding: "12px", fontWeight: "600", fontSize: "16px" }}
            >
              Email
            </th>
            <th
              style={{ padding: "12px", fontWeight: "600", fontSize: "16px" }}
            >
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr style={{ backgroundColor: "#f9f9f9" }} key={index}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {item.name}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {item.email}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {item.password}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleChange}
                required
                autoComplete="name"
                style={{ padding: "10px", margin: "5px", width: "100%" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleChange}
                required
                autoComplete="email"
                style={{ padding: "10px", margin: "5px", width: "100%" }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                style={{ padding: "10px", margin: "5px", width: "100%" }}
              />

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={toggleModal}
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
