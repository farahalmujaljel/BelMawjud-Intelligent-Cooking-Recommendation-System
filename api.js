import axios from "axios";

const API = "http://127.0.0.1:5000";

// REGISTER
export const registerUser = (data) => axios.post(`${API}/register`, data);

// LOGIN
export const loginUser = (data) => axios.post(`${API}/login`, data);

// PREDICT
export const predictIngredients = (data) => axios.post(`${API}/predict`, data);
