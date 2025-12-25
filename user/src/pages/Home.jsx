import Categories from "../components/Categories";
import FAQ from "../components/FAQ";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import HeaderSlider from "../components/HeaderSlider";
import Navbar from "../components/Navbar";

export default function Home() {

    return (
        <>
            <Navbar />
            <HeaderSlider />
            <Categories />

            <>
                <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl/tight font-semibold text-gray-900 sm:text-4xl">
                            Your gifts, your style.
                        </h2>

                        <p className="mt-4 text-sm text-gray-700">
                            Choose your favorite designs for diaries, posters, bookmarks, and calendars — add your name and custom message, and order easily via WhatsApp.
                        </p>
                    </div>
                </div>
            </>

            <FeaturedProducts />

            <>
                <section>
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div>
                            <h2 className="text-3xl/tight font-semibold text-gray-900 sm:text-4xl">
                                What We Provide
                            </h2>

                            <p className="mt-4 text-lg text-pretty text-gray-700">
                                We offer beautifully designed diaries, posters, bookmarks, and calendars that you can personalize with your name and custom messages. Every item is crafted to create meaningful, memorable gifts for every occasion.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 p-6 bg-black/5">
                                <h3 className="mb-8 text-xl font-semibold text-gray-900">Personalized Just for You</h3>
                                <p className="mt-2 text-pretty text-gray-700">
                                    Add your name, a special message, or a quote to make each diary, poster, or calendar truly unique — designed to reflect your personality.
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 bg-black/5">
                                <h3 className="mb-8 text-xl font-semibold text-gray-900">High-Quality Designs</h3>
                                <p className="mt-2 text-pretty text-gray-700">
                                    Every design is carefully created with attention to detail, using quality materials and printing to ensure your keepsakes look beautiful and last long.
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 bg-black/5">
                                <h3 className="mb-8 text-xl font-semibold text-gray-900">Perfect for Gifting</h3>
                                <p className="mt-2 text-pretty text-gray-700">
                                    Celebrate birthdays, anniversaries, or special moments with personalized gifts that show thought, care, and love — delivered straight to your loved ones via WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </>

            <FAQ />


            <Footer />

        </>
    )
}
