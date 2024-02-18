import React, { useState } from "react";
import axios from "axios"; 
import "../styles/registration.css";
import { BASE_URL } from "../../baseUrl";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError, notifyWarnings } from "../utils/fuctions";
import "react-toastify/dist/ReactToastify.css";

function Login() {
 
    const [selectedImages, setSelectedImages] = useState([]);
    const [username, setUsername] = useState("");
  
  
    const handleImageClick = (identifier) => {
      if (selectedImages.includes(identifier)) {
        setSelectedImages(selectedImages.filter(id => id !== identifier));
      } else {
        if (selectedImages.length < 4) {
          console.log(...selectedImages, identifier);
          setSelectedImages([...selectedImages, identifier]);
        } else {
          console.log(" ");
        }
      }
    };
  
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleSubmit = async () => {
      try {
        const password = selectedImages.join("");
        const response = await axios.post(`${BASE_URL}/login`, {
          username: username,
          password: password
        });
        notifySuccess("login successful!")
      } catch (error) {
        notifyError('Login Failed!')
      }
    };
    
  
    return (
      <div className="bod">
        <div className="container">
          <label htmlFor="username">Enter your username:</label>
          <input
            type="text"
            id="username"
            className="username-input"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
         
          <div className="grid">
            <div className="grid-item img1" onClick={() => handleImageClick(5)}></div>
            <div className="grid-item img2" onClick={() => handleImageClick(3)}></div>
            <div className="grid-item img3" onClick={() => handleImageClick(2)}></div>
            <div className="grid-item img4" onClick={() => handleImageClick(0)}></div>
            <div className="grid-item img5" onClick={() => handleImageClick(9)}></div>
            <div className="grid-item img6" onClick={() => handleImageClick(1)}></div>
            <div className="grid-item img7" onClick={() => handleImageClick(8)}></div>
            <div className="grid-item img8" onClick={() => handleImageClick(4)}></div>
            <div className="grid-item img9" onClick={() => handleImageClick(7)}></div>
          </div>
          <button className="submit" onClick={handleSubmit}>Submit</button> 
          <p className="regredir">
            Don't an account? <a href="/">signUp</a>
          </p>
          <ToastContainer/>
        </div>
      </div>
    );
}

export default Login;
