import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ShippingDeliveryPolicy() {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Shipping & Delivery Policy</h1>
                <p className="text-gray-600 mb-6">Last Updated: {new Date().toDateString()}</p>

                <h2 className="text-xl font-semibold mb-2">Shipping Time</h2>
                <p className="mb-4">
                    Orders are processed within 1–2 days and delivered in 3–7 business days based on location.
                </p>

                <h2 className="text-xl font-semibold mb-2">Shipping Charges</h2>
                <p className="mb-4">
                    Charges may vary based on your location or order size.
                </p>

                <h2 className="text-xl font-semibold mb-2">Tracking</h2>
                <p className="mb-4">
                    We share courier tracking details via WhatsApp once dispatched.
                </p>

                <h2 className="text-xl font-semibold mb-2">Delivery Attempts</h2>
                <p>
                    Courier partners attempt 2–3 deliveries. If undelivered, the order returns to us.
                </p>
            </div>
            <Footer />
        </>
    );
}
