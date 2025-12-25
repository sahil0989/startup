import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RefundReturnPolicy() {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Refund & Return Policy</h1>
                <p className="text-gray-600 mb-6">Last Updated: {new Date().toDateString()}</p>

                <h2 className="text-xl font-semibold mb-2">Return Eligibility</h2>
                <p className="mb-4">
                    Returns are accepted only if the item is damaged, defective, or incorrect. Must be
                    requested within 3–7 days of delivery.
                </p>

                <h2 className="text-xl font-semibold mb-2">Conditions</h2>
                <ul className="list-disc ml-5 mb-4">
                    <li>Must be unused</li>
                    <li>Must contain all original packaging</li>
                    <li>Must include order proof</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">Refund Process</h2>
                <p className="mb-4">
                    Refund is processed within 3–7 working days via original method or as store credit.
                </p>

                <h2 className="text-xl font-semibold mb-2">Contact for Returns</h2>
                <p>
                    WhatsApp: 📞 {`{Your WhatsApp Number}`}
                </p>
            </div>
            <Footer />
        </>
    );
}
