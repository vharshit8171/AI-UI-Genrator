import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSiteStore from "../../../../store/SiteStore.js";
import ComponentRenderer from "../../Renderer/ComponentRenderer.jsx";

export default function PreviewPage() {
    const { id, page } = useParams();

    const pages = useSiteStore((s) => s.pages);
    const components = useSiteStore((s) => s.components);
    const setCurrentPageByPath = useSiteStore((s) => s.setCurrentPageByPath);
    const fetchSiteById = useSiteStore((s) => s.fetchSiteById);

    // This api call is again used to fetch the site data becuase on window.open the whole app is load as a fresh i.e why we need to fetch the site data again.

    useEffect(() => {
        fetchSiteById(id);
    }, [id, fetchSiteById]);

    // This useeffect is run when the user open the preview page with a specific page path like /preview/12345/about, so we need to set the current page in the store based on the page path in the url so that correct page data and its components are rendered in the preview.

    useEffect(() => {
        if (pages.length > 0 && page) {
            const matchedPage = pages.find((p) => p.path === page);

            if (matchedPage) {
                setCurrentPageByPath(page);
            }
        }
    }, [page, pages, setCurrentPageByPath]);

    return (
        <div className="min-h-screen bg-white">
            {components
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((comp) => (
                    <ComponentRenderer key={comp._id} component={comp} />
                ))}
        </div>
    );
}