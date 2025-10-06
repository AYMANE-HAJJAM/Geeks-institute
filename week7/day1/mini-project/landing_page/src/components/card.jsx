function Card({ icon, title, text }) {
    return (
        <section className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-8 gap-6 rounded-lg shadow-sm">
            <div className="text-orange-500 text-6xl">{icon}</div>
            <div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700">{text}</p>
            </div>
        </section>
    );
}

export default Card;
