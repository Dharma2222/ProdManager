import {
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    products: [],
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
      case FETCH_PRODUCTS_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
      case DELETE_PRODUCT_REQUEST:
        return { ...state, loading: true };
  
      case CREATE_PRODUCT_SUCCESS:
        return { ...state, loading: false, products: [...state.products, action.payload] };
  
      case FETCH_PRODUCTS_SUCCESS:
        return { ...state, loading: false, products: action.payload };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.map((p) => p._id === action.payload._id ? action.payload : p),
        };
  
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.filter((p) => p._id !== action.payload),
        };
  
      case CREATE_PRODUCT_FAILURE:
      case FETCH_PRODUCTS_FAILURE:
      case UPDATE_PRODUCT_FAILURE:
      case DELETE_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  