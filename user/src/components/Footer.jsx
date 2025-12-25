import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

                {/* Logo & Description */}
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex items-center gap-3">
                        {/* <img
                            src={logo}
                            className="w-14 h-14 object-contain"
                            alt="JustANote"
                        /> */}
                        <h4 className="font-semibold text-[#c34550] text-xl">
                            Unknown
                        </h4>
                    </div>
                    <p className="mt-3 text-gray-600 max-w-xs">
                        Personalized diaries, posters, bookmarks, and calendars — designed with your name and custom messages, delivered straight to your loved ones via WhatsApp.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="mt-10 flex justify-center gap-6 text-gray-700 text-2xl">
                    <a href="https://instagram.com/justanote" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com/justanote" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                        <FaFacebook />
                    </a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                        <FaWhatsapp />
                    </a>
                </div>

                {/* Bottom Text */}
                <p className="mt-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Unknown · All Rights Reserved
                </p>

            </div>
        </footer>
    );
}
