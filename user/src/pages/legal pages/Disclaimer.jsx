import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Disclaimer() {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
                <p className="text-gray-600 mb-6">Last Updated: {new Date().toDateString()}</p>

                <p className="mb-4">
                    The information on this website is for general use only. Product images may vary due to
                    lighting or display differences.
                </p>

                <p className="mb-4">
                    We are not liable for WhatsApp issues, courier delays, or incorrect information supplied by users.
                </p>

                <p>
                    Prices, stock availability, and product details may change without prior notice.
                </p>
            </div>
            <Footer />
        </>
    );
}
