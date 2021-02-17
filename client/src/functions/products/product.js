import axios from "axios";

// Get All products
export const getProducts = async () => await axios.get(`${process.env.REACT_APP_API}/products`);
export const getSearchedProducts = async (query) => await axios.post(`${process.env.REACT_APP_API}/products/search`,query);
// Cart
export const addItem = async (product) => await axios.put(`${process.env.REACT_APP_API}/cart/${product}`)
export const increase = async (product) => await axios.put(`${process.env.REACT_APP_API}/cart/${product}`)
export const decrease = async (product) => await axios.delete(`${process.env.REACT_APP_API}/cart/product/${product}`)
export const deleteProduct = async (product) => await axios.delete(`${process.env.REACT_APP_API}/cart/${product}`)