import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-6">Last Updated: {new Date().toDateString()}</p>

                <p className="mb-4">
                    Welcome to <strong>{`Qala 'n' Dharover`}</strong>. We value your privacy and are committed to
                    protecting your personal information.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
                <p className="mb-4">
                    We do not collect personal data on our website. When you contact us or place an
                    order through WhatsApp Business, we may receive:
                </p>
                <ul className="list-disc ml-5 mb-4">
                    <li>Your name</li>
                    <li>Your WhatsApp number</li>
                    <li>Your address (if provided)</li>
                    <li>Product-related details</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
                <p className="mb-4">
                    Your information is used only to process orders, provide support, and verify details.
                    We do not sell or share your data.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
                <p className="mb-4">
                    We do not store sensitive data externally. WhatsApp handles your data under its own privacy policy.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
                <p>
                    For concerns: <br />
                    📩 {`{Your Email}`} <br />
                    📞 {`{Your Phone}`}
                </p>
            </div>
            <Footer />
        </>
    );
}
