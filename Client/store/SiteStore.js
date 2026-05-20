import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BASE_URL = "http://localhost:3000/api/v1/website";

const initialState = {
  sites: [],
  globalPrompt: "",
  selectedSite: null,
  selectedModel: "openai/gpt-4o-mini",
  totalSites: 0,

  pages: [],
  currentPage: null,
  components: [],

  isLoading: false,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  error: null,
  fetchError: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

const fetchAPI = async (url, options = {}) => {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};

const useSiteStore = create(
  devtools((set, get) => ({
    ...initialState,

    fetchSites: async () => {
      set({ isFetching: true, fetchError: null });

      try {
        const res = await fetch(`${BASE_URL}/my`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        const sites = data?.message || [];

        set({
          sites,
          totalSites: sites.length,
          isFetching: false,
        });

        return { success: true, sites };
      } catch (error) {
        set({
          fetchError: error.message,
          isFetching: false,
        });

        return { success: false, error: error.message };
      }
    },

    setCurrentPageByPath: (path) => set((state) => {
        if (!state.pages || state.pages.length === 0) return {};

        // clean path (remove leading slash if any)
        const cleanPath = path?.replace("/", "");
        const page = state.pages.find((p) => p.path === cleanPath);

        if (!page) {
          console.warn("Page not found for path:", cleanPath);
          return {};
        }

        return {
          currentPage: page,
          components: page.components || [],
        };
      }),

    fetchSiteById: async (siteId) => {
      set({ isFetching: true, fetchError: null });

      try {
        const data = await fetchAPI(`${BASE_URL}/${siteId}`);

        // Inside this api call, we fetch the site data along with its pages and components. So we doesnt need to make seprate api endpoints to fetch pages and components for preview and souce code feature.

        const site = data?.site?.message?.website || data?.message?.website;
        const pages = site.pages || [];
        const currentPage = pages.find((p) => p.isHomePage) || pages[0];

        console.log("fetched site", site)

        // all the pages,components data of the fetchedwebsite by id are stored inside these 3 states i.e selectedSite, pages and components which are used in preview and source code feature.

        set({
          selectedSite: site,
          pages,
          currentPage,
          components: currentPage?.components || [],
          isFetching: false,
        });

        return site;
      } catch (error) {
        set({
          fetchError: error.message,
          isFetching: false,
        });

        return null;
      }
    },

    createSite: async (prompt) => {
      const aiModel = get().selectedModel;
      set({ isCreating: true, createError: null });
      console.log("calling", aiModel, prompt)
      try {
        const res = await fetch(`${BASE_URL}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, aiModel }),
          credentials: "include",
        });
        const data = await res.json();
        console.log("result", data)
        const newSite = data?.message;

        set((state) => ({
          sites: [newSite, ...state.sites],
          selectedSite: newSite,
          totalSites: state.totalSites + 1,
          isCreating: false,
        }));

        return { success: true, site: newSite };
      } catch (error) {
        set({
          createError: error.message,
          isCreating: false,
        });

        return { success: false, error: error.message };
      }
    },

    updateSite: async (siteId, updatedData) => {
      set({ isUpdating: true, updateError: null });

      try {
        const data = await fetchAPI(`${BASE_URL}/${siteId}`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
        });

        const updatedSite = data?.site ?? data;

        set((state) => ({
          sites: state.sites.map((site) =>
            site._id === siteId || site.id === siteId ? updatedSite : site
          ),
          selectedSite:
            state.selectedSite?._id === siteId ||
              state.selectedSite?.id === siteId
              ? updatedSite
              : state.selectedSite,
          isUpdating: false,
        }));

        return { success: true, site: updatedSite };
      } catch (error) {
        set({
          updateError: error.message,
          isUpdating: false,
        });

        return { success: false, error: error.message };
      }
    },

    deleteSite: async (siteId) => {
      set({ isDeleting: true, deleteError: null });

      try {
        await fetchAPI(`${BASE_URL}/id/${siteId}`, {
          method: "DELETE",
        });
        set((state) => ({
          sites: state.sites.filter(
            (site) => site._id !== siteId && site.id !== siteId
          ),
          selectedSite:
            state.selectedSite?._id === siteId ||
              state.selectedSite?.id === siteId
              ? null
              : state.selectedSite,
          totalSites: state.totalSites - 1,
          isDeleting: false,
        }));

        return { success: true };
      } catch (error) {
        set({
          deleteError: error.message,
          isDeleting: false,
        });

        return { success: false, error: error.message };
      }
    },

    setSelectedSite: (site) => set({ selectedSite: site }),
    setglobalPrompt: (prompt) => set({ globalPrompt: prompt }),
    setSelectedModel: (model) => set({ selectedModel: model }),

    clearSelectedSite: () => set({ selectedSite: null }),

    clearErrors: () =>
      set({
        error: null,
        fetchError: null,
        createError: null,
        updateError: null,
        deleteError: null,
      }),

    resetStore: () => set(initialState),
  }))
);

export default useSiteStore;