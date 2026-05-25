export default function Hero({ headline, subheadline, buttons, styles, }) {
    return (
        <div style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            padding: styles?.padding,
            textAlign: styles?.alignment,
        }}
            className="space-y-4">
            <h1 className="text-4xl font-bold">{headline}</h1>
            <p className="text-lg opacity-80">{subheadline}</p>

            <div className="flex justify-center gap-4 mt-4">
                {buttons?.map((btn, i) => (
                    <button key={i}
                        className="px-5 py-2 rounded bg-black text-white">
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}