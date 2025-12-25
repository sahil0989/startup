import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsConditions() {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
                <p className="text-gray-600 mb-6">Last Updated: {new Date().toDateString()}</p>

                <p className="mb-4">
                    By accessing our website, you agree to follow these Terms & Conditions. Our website
                    is used only for viewing products and redirecting users to WhatsApp Business for purchases.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Product Information</h2>
                <p className="mb-4">
                    We attempt to provide accurate information. Colors may vary due to device screens and
                    availability may change.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Ordering Process</h2>
                <p className="mb-4">
                    All orders are placed exclusively through WhatsApp Business by clicking "Order on WhatsApp."
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Payments</h2>
                <p className="mb-4">
                    Payments are handled only via WhatsApp — nothing is processed on this website.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Liability</h2>
                <p>
                    We are not responsible for WhatsApp outages, courier delays, or incorrect details provided by users.
                </p>
            </div>
            <Footer />
        </>
    );
}
