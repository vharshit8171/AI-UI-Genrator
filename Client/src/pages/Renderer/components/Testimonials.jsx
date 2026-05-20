export default function Testimonials({ title, items = [], styles }) {
    return (
        <section style={styles} className="p-10">
            <h2 className="text-2xl font-bold mb-6">{title || "Testimonials"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="p-4 border rounded-xl shadow-sm">
                        <p className="text-gray-600">"{item.message}"</p>
                        <h4 className="mt-2 font-semibold">- {item.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
}