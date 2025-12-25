import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Auth (you can later replace this with real auth user)
    const [user, setUser] = useState("Qala Dharover");

    // Global Data State
    const [slides, setSlides] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    /* ================= FETCH COLLECTIONS ================= */
    const fetchCollections = useCallback(async () => {
        try {
            setLoadingData(true);
            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/collections`,
                { withCredentials: true }
            );
            setCollections(res.data);
        } catch (err) {
            console.error("Collections fetch failed", err);
        } finally {
            setLoadingData(false);
        }
    }, []);

    /* ================= FETCH PRODUCTS ================= */
    const fetchProducts = useCallback(async (params = {}) => {
        try {
            setLoadingData(true);
            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/products`,
                {
                    params,
                    withCredentials: true,
                }
            );
            setAllProducts(res.data.products);
        } catch (err) {
            console.error("Products fetch failed", err);
        } finally {
            setLoadingData(false);
        }
    }, []);

    /* ================= FETCH SLIDES ================= */
    const fetchSlides = useCallback(async (params = {}) => {
        try {
            setLoadingData(true);
            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/header-slides`,
                {
                    params,
                    withCredentials: true,
                }
            );
            const liveSlides = res.data.filter(slide => slide.active);
            setSlides(liveSlides);
        } catch (err) {
            console.error("Products fetch failed", err);
        } finally {
            setLoadingData(false);
        }
    }, []);

    /* ================= INITIAL LOAD ================= */
    useEffect(() => {
        fetchCollections();
        fetchProducts();
        fetchSlides();
    }, [fetchCollections, fetchProducts, fetchSlides]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                // Data
                allProducts,
                collections,
                slides,

                // Loaders
                loadingData,

                // Actions
                fetchProducts,
                fetchCollections,
                setAllProducts,
                setCollections,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
