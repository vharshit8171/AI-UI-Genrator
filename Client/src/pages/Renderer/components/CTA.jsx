export default function CTA({ heading, buttons, styles }) {
    return (
        <div
            style={{
                backgroundColor: styles?.bg,
                color: styles?.text,
                padding: styles?.padding,
                textAlign: styles?.alignment,
            }}
        >
            <h2 className="text-2xl font-bold">{heading}</h2>

            <div className="mt-4">
                {buttons?.map((btn, i) => (
                    <button
                        key={i}
                        className="px-6 py-2 bg-white text-black rounded"
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}