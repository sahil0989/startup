import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

const tabs = ["all", "pending", "handled"];
const PAGE_SIZES = [10, 25, 50];

export default function AdminContactMessages() {
    const [allMessages, setAllMessages] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    /* ================= FETCH ================= */
    const fetchMessages = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/contact`,
                { credentials: "include" }
            );
            const data = await res.json();
            setAllMessages(data);
        } catch {
            toast.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    /* ================= FILTER + SEARCH ================= */
    const filteredMessages = useMemo(() => {
        const q = search.toLowerCase();

        return allMessages.filter(msg => {
            const matchesTab =
                activeTab === "all" || msg.status === activeTab;

            const matchesSearch =
                msg.name.toLowerCase().includes(q) ||
                msg.email.toLowerCase().includes(q) ||
                msg.message.toLowerCase().includes(q);

            return matchesTab && matchesSearch;
        });
    }, [allMessages, activeTab, search]);

    /* ================= PAGINATION ================= */
    const totalPages = Math.ceil(filteredMessages.length / pageSize);

    const paginatedMessages = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredMessages.slice(start, start + pageSize);
    }, [filteredMessages, currentPage, pageSize]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, search, pageSize]);

    /* ================= ACTIONS ================= */
    const markHandled = async (id) => {
        try {
            await fetch(
                `${process.env.REACT_APP_API_URL}/api/contact/${id}/handle`,
                { method: "PUT", credentials: "include" }
            );

            setAllMessages(prev =>
                prev.map(m =>
                    m._id === id ? { ...m, status: "handled" } : m
                )
            );

            toast.success("Marked as handled");
        } catch {
            toast.error("Failed to update status");
        }
    };

    const deleteMessage = async (id) => {
        try {
            await fetch(
                `${process.env.REACT_APP_API_URL}/api/contact/${id}`,
                { method: "DELETE", credentials: "include" }
            );

            setAllMessages(prev => prev.filter(m => m._id !== id));
            toast.success("Message deleted");
        } catch {
            toast.error("Failed to delete message");
        }
    };

    /* ================= SEARCH HIGHLIGHT ================= */
    const highlightText = (text) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <mark key={i} className="bg-yellow-200 px-0.5 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                    Contact Messages
                </h1>

                {/* ================= TABS ================= */}
                <div className="flex gap-3 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs rounded-full font-medium transition
                                ${activeTab === tab
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* ================= SEARCH + PAGE SIZE ================= */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search name, email or message..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-900 outline-none"
                    />

                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="px-4 py-2 border rounded-lg"
                    >
                        {PAGE_SIZES.map(size => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>
                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-12 p-4 text-center">#</th>
                                <th className="w-1/6 p-4 text-left">Name</th>
                                <th className="w-1/5 p-4 text-left">Email</th>
                                <th className="w-2/5 p-4 text-left">Message</th>
                                <th className="w-1/12 p-4 text-center">Status</th>
                                <th className="w-32 p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center">
                                        Loading messages...
                                    </td>
                                </tr>
                            )}

                            {!loading && paginatedMessages.map((msg, idx) => (
                                <tr
                                    key={msg._id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4 text-center text-gray-500">
                                        {(currentPage - 1) * pageSize + idx + 1}
                                    </td>

                                    <td className="p-4 font-medium">
                                        {highlightText(msg.name)}
                                    </td>

                                    <td className="p-4 text-gray-600 break-words">
                                        {highlightText(msg.email)}
                                    </td>

                                    <td className="p-4">
                                        <p className="line-clamp-2">
                                            {highlightText(msg.message)}
                                        </p>
                                    </td>

                                    <td className="p-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${msg.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {msg.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center grid grid-cols-1 gap-2">
                                        {msg.status === "pending" && (
                                            <button
                                                onClick={() => markHandled(msg._id)}
                                                className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200"
                                            >
                                                ✓ Handle
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMessage(msg._id)}
                                            className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                                        >
                                            🗑 Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {!loading && paginatedMessages.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">
                                        No messages found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ================= PAGINATION CONTROLS ================= */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded
                                    ${currentPage === i + 1
                                        ? "bg-gray-900 text-white"
                                        : "border"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
