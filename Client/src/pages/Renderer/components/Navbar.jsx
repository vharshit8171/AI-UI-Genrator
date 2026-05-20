import { Link, useParams, useLocation } from "react-router-dom";

export default function Navbar({ logo, links, styles }) {
    const { id } = useParams();
    const location = useLocation();

    const isPreview = location.pathname.includes("/preview");

    return (
        <div style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
            }}
            className="flex justify-between items-center px-8 py-4 shadow-sm">
            <h1 className="font-bold text-lg">{logo}</h1>

            <div className="flex gap-6">
                {links?.map((link, i) => {
                    const path = isPreview
                        ? `/preview/${id}/${link.path}`
                        : `/${link.path}`;

                    return (
                        <Link key={i} to={path} className="hover:opacity-70">
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}