import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BASE_URL = "http://localhost:3000/api/v1/website";

const initialState = {
  sites: [],
  globalPrompt: "",
  selectedSite: null,
  selectedModel: "openai/gpt-4o-mini",
  totalSites: 0,

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
  devtools((set) => ({
    ...initialState,

    fetchSites: async () => {
      set({ isFetching: true, fetchError: null });

      try {
        const res = await fetch(`${BASE_URL}/my`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        const sites = data?.data || [];

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

    fetchSiteById: async (siteId) => {
      set({ isFetching: true, fetchError: null });
      try {
        const res = await fetch(`${BASE_URL}/${siteId}`,{
          method:"GET",
          credentials:"include"
        });
        const data = await res.json();
        const site = data?.data;
        set({
          selectedSite: site,
          components: site?.components,
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
      // const aiModel = get().selectedModel;
      set({ isCreating: true, createError: null });
      try {
        const res = await fetch(`${BASE_URL}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
          credentials: "include",
        });
        const finalResult = await res.json();
        const responseData = finalResult?.data;

        const newSite = {
          ...responseData.page,
          components: responseData.components,
        };

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
        await fetch(`${BASE_URL}/id/${siteId}`, {
          method: "DELETE",
          credentials: "include",
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