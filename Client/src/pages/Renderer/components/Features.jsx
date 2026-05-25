export default function Features({ title, items, styles }) {
    return (
        <div style={{
                backgroundColor: styles?.bg,
                color: styles?.text,
                padding: styles?.padding || "80px 20px",
            }}>
            <h2 className="text-2xl font-bold text-center mb-8">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map((item, i) => (
                    <div key={i} className="p-4 border rounded">
                        <div className="text-2xl">{item.icon}</div>
                        <h3 className="font-semibold mt-2">{item.title}</h3>
                        <p className="text-sm opacity-70">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}