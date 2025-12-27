import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function AboutUs() {

    const { loadingData } = useAuth();

    if (loadingData) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
                    alt="Personalized gifts"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide">
                        About Us
                    </h1>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-12">

                {/* Our Story */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        We started with a idea — make personalized gifting easy, meaningful,
                        and accessible. From diaries and posters to bookmarks and calendars,
                        we turn everyday designs into something personal with names, messages,
                        and emotions that matter.
                    </p>
                </div>

                {/* Mission + Vision */}
                <div className="mt-16 grid md:grid-cols-2 gap-10">
                    <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                        <p className="mt-3 text-gray-600">
                            To create thoughtful, personalized products that help people express
                            emotions, memories, and moments — simply and beautifully.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
                        <p className="mt-3 text-gray-600">
                            To become a go-to brand for meaningful personalized gifts,
                            powered by creativity and human connection.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mt-20">
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Why Choose Us
                    </h2>

                    <div className="mt-10 grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold">Personalized for You</h3>
                            <p className="text-gray-600 mt-2">
                                Every product is customized with your name, message, or occasion.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold">Simple WhatsApp Ordering</h3>
                            <p className="text-gray-600 mt-2">
                                Browse designs, click buy, and complete your order directly on WhatsApp.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold">Thoughtful Designs</h3>
                            <p className="text-gray-600 mt-2">
                                Clean, modern designs made for gifting and everyday moments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-20 bg-gray-900 text-white p-10 rounded-xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Ready to create something personal?
                    </h2>
                    <p className="mt-3 text-gray-300">
                        Explore our designs and turn them into meaningful gifts.
                    </p>

                    <Link
                        to="/catalogue"
                        className="inline-block mt-6 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow hover:bg-gray-200"
                    >
                        Explore Designs
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
