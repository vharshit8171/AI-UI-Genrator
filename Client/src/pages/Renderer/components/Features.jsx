export default function Features({ heading, items, styles }) {
    return (
        <div
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding,
            }}
        >
            <h2 className="text-2xl font-bold text-center mb-8">
                {heading}
            </h2>

            <div className="grid grid-cols-3 gap-6">
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