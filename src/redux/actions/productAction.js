import axios from 'axios';
import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE
} from './types';

export const axiosInst = axios.create({baseURL:import.meta.env.VITE_API_URL})

axiosInst.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
// Create Product
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await axiosInst.post('/api/products', productData);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Fetch Products
export const fetchProducts = (page = 1, limit = 6) => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const { data } = await axiosInst.get( `/api/products?page=${page}&limit=${limit}`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const { data } = await axiosInst.put(`/api/products/${id}`, productData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await axiosInst.delete(`/api/products/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
