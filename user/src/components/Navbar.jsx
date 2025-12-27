import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import logo from "../images/qala 'n' dharover.png"
import { Link } from "react-router-dom";

export default function Navbar() {
    // const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationLinks = [
        { label: "About Us", path: "about" },
        { label: "Catalogue", path: "catalogue" },
        { label: "Categories", path: "all_collections" },
        { label: "Contact Us", path: "contact" },
    ];


    return (
        <header className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        {/* logo  */}
                        <Link to="/">
                            <div className="flex items-center gap-3">
                                <img src={logo} className="w-12 h-12 overflow-cover" alt="Unknown" />
                                <h4 className="hidden md:block font-semibold text-[#c34550] text-lg">Unknown</h4>
                            </div>
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        {/* Desktop navigation */}
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                {navigationLinks.map((item) => (
                                    <li key={item.path}>
                                        <Link to={`/${item.path}`} className="text-gray-500 transition hover:text-gray-700">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile menu toggle + Mobile search */}
                        <div className="flex items-center gap-3 md:hidden">

                            {/* Hamburger button */}
                            <button
                                className="rounded-sm bg-gray-100 p-2 text-gray-600"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <HiOutlineBars3 size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                )}

                {/* Mobile Drawer */}
                <div
                    className={`fixed top-0 left-0 z-50 h-full w-64 bg-white p-6 shadow-lg transform transition-transform duration-300 md:hidden 
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    {/* Close button */}
                    <button
                        className="mb-8 p-2 text-gray-800 ml-auto block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <RxCross2 size={24} />
                    </button>

                    <ul className="flex flex-col gap-6 text-md">
                        {navigationLinks.map((item) => (
                            <li key={item.path}>
                                <Link to={`/${item.path}`} className="text-gray-500 transition hover:text-gray-700">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
