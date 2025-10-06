function Contact() {
    return (
        <section className="bg-gray-100 p-8">
            <h2 className="text-center text-2xl font-bold mb-6">Contact Us</h2>

            <div className="flex flex-col md:flex-row justify-center gap-10">
                {/* Contact Info */}
                <div className="text-gray-700">
                    <p>Contact us and we will get back to you within 24 hours.</p>
                    <p className="mt-4 font-semibold">Company Name</p>
                    <p><i className="fas fa-phone text-orange-500 mr-2"></i> +256 778 800 900</p>
                    <p><i className="fas fa-envelope text-orange-500 mr-2"></i> company@gmail.com</p>
                </div>

                {/* Contact Form */}
                <form className="bg-white shadow-md p-6 rounded-md w-full max-w-md">
                    <label className="block mb-2 font-semibold">Email address</label>
                    <input
                        type="email"
                        className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your email"
                    />

                    <label className="block mb-2 font-semibold">Comment</label>
                    <textarea
                        rows="4"
                        className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Write your comment..."
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
