export default function Footer({ copyright, styles }) {
    return (
        <div style={{backgroundColor: styles?.bg,
                color: styles?.text,
                padding: styles?.padding,
            }} className="text-center">
            <p className="text-sm opacity-70">{copyright}</p>
        </div>
    );
}