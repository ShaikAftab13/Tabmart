import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            await api.post("/auth/login", { email, password });
            const { data } = await api.get("/auth/user");
            setUser(data.user);
            toast.success("Login successful");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    }

    const register = async (name, email, password) => {
        try {
            await api.post("/auth/register", { name, email, password });
            const { data } = await api.get("/auth/user");
            setUser(data.user);
            toast.success("Account Registered successful");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    }

    const logout = async () => {
        try {
            const { data } = await api.post("/auth/logout");
            setUser(null);
            navigate("/");
            toast.success(data.message)
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }
    }

    const updateUser = (userData) => {
        if (user) {
            const updated = { ...user, ...userData };
            setUser(updated);
        }
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const { data } = await api.get("/auth/user");
                if (!data) {
                    console.log("Login");
                }
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getCurrentUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;