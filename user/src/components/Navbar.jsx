import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import logo from "../images/qala 'n' dharover.png"
import { Link } from "react-router-dom";

export default function Navbar() {
    // const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search:", searchQuery);
    };

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

                        {/* 🔍 Desktop Search Bar (new) */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-300 focus-within:shadow-md"
                        >
                            <MdSearch size={20} className="text-gray-500 mr-2" />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-24 focus:w-60 transition-all duration-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>


                        {/* Profile dropdown (Desktop) */}
                        {/* <div className="hidden md:block md:relative">
                            <button
                                type="button"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                            >
                                <span className="sr-only">Toggle dashboard menu</span>
                                <img
                                    src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg"
                                    alt=""
                                    className="size-10 object-cover"
                                />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border bg-white shadow-lg">
                                    <div className="p-2">
                                        <a href="/" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">My profile</a>
                                        <a href="/" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Billing summary</a>
                                        <a href="/" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Team settings</a>
                                    </div>

                                    <div className="p-2">
                                        <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div> */}

                        {/* Mobile menu toggle + Mobile search */}
                        <div className="flex items-center gap-3 md:hidden">

                            {/* Mobile search form */}
                            <form
                                onSubmit={handleSearch}
                                className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-300 focus-within:shadow-md"
                            >
                                <MdSearch size={20} className="text-gray-500 mr-2" />

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-sm w-12 focus:w-44 transition-all duration-300"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>

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
                        {["About Us", "Catelog", "Categories", "Contact Us"].map((item) => (
                            <li key={item}>
                                <a
                                    className="text-gray-700 hover:text-gray-900"
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}

                        {/* Mobile Profile */}
                        {/* <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 mt-2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1160"
                                alt=""
                                className="size-8 rounded-full object-cover"
                            />
                            <span className="text-gray-700">Profile</span>
                        </button> */}

                        {/* Profile Dropdown inside Drawer */}
                        {/* {isProfileOpen && (
                            <div className="mt-2 space-y-1 rounded-md bg-gray-50 p-3">
                                <a href="/" className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800">My profile</a>
                                <a href="/" className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800">Billing summary</a>
                                <a href="/" className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800">Team settings</a>
                                <button className="block w-full text-left px-2 py-1 text-sm text-red-600 hover:text-red-800">Logout</button>
                            </div>
                        )} */}
                    </ul>
                </div>
            </div>
        </header>
    );
}
