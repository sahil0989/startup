import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function ContactUs() {

    const { loadingData } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/contact`,
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Server error"
            );
        }
    };

    if (loadingData) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-64 md:h-80">
                <img
                    src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Contact"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-4 py-14">

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
                        <p className="mt-3 text-gray-600">
                            Have questions about our handmade products? We’d love to hear from you.
                        </p>

                        <div className="mt-8 space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                                <p className="text-gray-600">support@unknown.com</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                                <p className="text-gray-600">+91 98765 43210</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                                <p className="text-gray-600">
                                    Crochet Crafts,
                                    21/12 Handmade Street,
                                    Mumbai, India – 400001
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="5"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-800 outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
            </section>

            {/* Google Map */}
            <div className="w-full h-80">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.16159576514!2d72.74109898911821!3d19.08219783988069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6307a50a5f7%3A0xd78b7e6c23b712c3!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605405483607!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            <Footer />
            <Toaster position="bottom-right" richColors />
        </>
    );
}
