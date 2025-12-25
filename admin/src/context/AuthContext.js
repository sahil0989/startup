import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Global State for Data
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // 1. Check Auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/check-auth", { withCredentials: true });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // 2. Fetch Collections (Centralized)
  const fetchCollections = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/collections", { withCredentials: true });
      setCollections(res.data);
    } catch (err) {
      console.error("Collections fetch failed", err);
    }
  }, []);

  // 3. Fetch Products (Centralized)
  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoadingData(true);
      const res = await axios.get("http://localhost:5000/api/products", { 
        params, 
        withCredentials: true 
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error("Products fetch failed", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCollections();
      fetchProducts();
    }
  }, [isAuthenticated, fetchCollections, fetchProducts]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loadingAuth,
        products,
        collections,
        loadingData,
        fetchCollections, // Call this after Add/Edit/Delete
        fetchProducts,    // Call this after Add/Edit/Delete
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);