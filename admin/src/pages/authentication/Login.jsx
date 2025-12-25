import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/login", // Use your backend URL
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                console.log("Login response:", response.data);
                setIsAuthenticated(true);
                navigate("/", { replace: true });
            }

        } catch (err) {
            console.log(err);
            // Axios errors
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white border rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-lg p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded-lg p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-600 text-white rounded-lg py-2 hover:bg-sky-700 disabled:opacity-50 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
