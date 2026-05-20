export default function Footer({ logo, tagline, styles }) {
    return (
        <div
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding,
            }}
            className="text-center"
        >
            <h3 className="font-bold">{logo}</h3>
            <p className="text-sm opacity-70">{tagline}</p>
        </div>
    );
}