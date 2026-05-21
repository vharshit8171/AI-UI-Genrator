import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { signInWithPopup, fetchSignInMethodsForEmail, signOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../src/config/firebase.js";

const BASE_URL = "http://localhost:3000/api/v1/user";
const delay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

const extractErrorMessage = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data?.message || data?.errors || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const mapUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  contactNumber: user.contactNumber,
  pages: user.pages || [],
  avatar: user.avatar?.url || null,
  role: user.role,
  authProvider: user.authProvider,
  credits: user.credits,
});

const initialState = {
  user: null,
  loading: {
    register: false,
    login: false,
    socialLogin: false,
    logout: false,
    deleteAccount: false,
    session: false,
  },
  errors: {
    register: null,
    login: null,
    socialLogin: null,
    logout: null,
    deleteAccount: null,
    session: null,
  },
  success: {
    register: false,
    login: false,
    socialLogin: false,
    logout: false,
    deleteAccount: false,
  },
  isAuthenticated: false,
  isInitialized: false,
};

const useAuthStore = create(
  devtools(
    (set, get) => ({
      ...initialState,

      _setLoading: (action, value) =>
        set((state) => ({ loading: { ...state.loading, [action]: value } }), false, `auth/${action}/loading`),

      _setError: (action, message) =>
        set((state) => ({ errors: { ...state.errors, [action]: message } }), false, `auth/${action}/error`),

      _setSuccess: (action, value) =>
        set((state) => ({ success: { ...state.success, [action]: value } }), false, `auth/${action}/success`),

      clearError: (action) =>
        set((state) => ({ errors: { ...state.errors, [action]: null } }), false, `auth/clearError/${action}`),

      initializeAuth: async () => {
        const { _setLoading, _setError } = get();

        _setLoading("session", true);
        _setError("session", null);

        try {
          const response = await fetch(`${BASE_URL}/me`, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            set({ user: null,
                isAuthenticated: false,
                isInitialized: true,
              },
              false,
              "auth/session/unauthorized"
            );
            return { success: false };
          }

          const data = await response.json();
          const user = mapUser(data.data);

          set({user,
              isAuthenticated: true,
              isInitialized: true,
            },
            false,
            "auth/session/success"
          );

          return { success: true, user };
        } catch (err) {
          const message = err?.message || "Failed to initialize session";
          _setError("session", message);

          set({user: null,
              isAuthenticated: false,
              isInitialized: true,
            },
            false,
            "auth/session/error"
          );

          return { success: false, error: message };
        } finally {
          _setLoading("session", false);
        }
      },

      register: async (payload) => {
        const { _setLoading, _setError, _setSuccess } = get();

        _setLoading("register", true);
        _setError("register", null);
        _setSuccess("register", false);

        try {
          await delay(900);

          const formData = new FormData();
          formData.append("name", payload.name);
          formData.append("email", payload.email);
          formData.append("password", payload.password);
          formData.append("contactNumber", payload.contact);

          if (payload.avatar) {
            formData.append("avatar", payload.avatar);
          }

          const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(await extractErrorMessage(response, "Registration failed"));
          }

          const data = await response.json();
          const user = mapUser(data.data);

          set({user,
              isAuthenticated: true,
              isInitialized: true,
            },
            false,
            "auth/register/success"
          );

          _setSuccess("register", true);
          return { success: true, user };
        } catch (err) {
          const message = err?.message || "Registration failed. Please try again.";
          _setError("register", message);
          return { success: false, error: message };
        } finally {
          _setLoading("register", false);
        }
      },

      login: async ({ email, password }) => {
        const { _setLoading, _setError, _setSuccess } = get();

        _setLoading("login", true);
        _setError("login", null);
        _setSuccess("login", false);

        try {
          await delay(800);
          const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(await extractErrorMessage(response, "Login failed"));
          }

          const data = await response.json();
          const user = mapUser(data.data);

          set({user,
              isAuthenticated: true,
              isInitialized: true,
            },
            false,
            "auth/login/success"
          );

          _setSuccess("login", true);
          return { success: true, user };
        } catch (err) {
          const message = err?.message || "Login failed. Please try again.";
          _setError("login", message);
          return { success: false, error: message };
        } finally {
          _setLoading("login", false);
        }
      },

      socialLogin: async (providerType) => {
        const { _setLoading, _setError, _setSuccess } = get();

        _setLoading("socialLogin", true);
        _setError("socialLogin", null);
        _setSuccess("socialLogin", false);

        try {
          await signOut(auth);
          await delay(800);
          let provider;
          if (providerType === "google") provider = googleProvider;
          if (providerType === "github") provider = githubProvider;

          if (!provider) {
            throw new Error("Provider not supported");
          }

          const result = await signInWithPopup(auth, provider);
          const idToken = await result.user.getIdToken(true);

          const response = await fetch(`${BASE_URL}/social-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken}),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(await extractErrorMessage(response, "Social login failed"));
          }

          const data = await response.json();
          const user = mapUser(data.data);
          console.log("social user", user);
          set({user,
              isAuthenticated: true,
              isInitialized: true,
            },
            false,
            "auth/socialLogin/success"
          );

          _setSuccess("socialLogin", true);
          return { success: true, user };
        } catch (err) {
          await signOut(auth);
          let message = err?.message || "Login failed. Please try again.";

          // Allowing user to login only from the provider they originally signed up with
          if (err?.code === "auth/account-exists-with-different-credential") {
            const email = err.customData?.email;
            const methods = await fetchSignInMethodsForEmail(auth, email);

            if (methods[0] === "google.com") {
              message = "This email is already registered with Google. Please login with Google.";
            } else if (methods[0] === "github.com") {
              message = "This email is already registered with GitHub. Please login with GitHub.";
            } else if (methods[0] === "password") {
              message = "This email is already registered. Please login with your password.";
            }
          }

          _setError("socialLogin", message);
          return { success: false, error: message };
        } finally {
          _setLoading("socialLogin", false);
        }
      },

      logout: async () => {
        const { _setLoading, _setError, _setSuccess } = get();

        _setLoading("logout", true);
        _setError("logout", null);
        _setSuccess("logout", false);

        try {
          await delay(400);
          const response = await fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(await extractErrorMessage(response, "Logout failed"));
          }
          await signOut(auth);

          set({user: null,
              isAuthenticated: false,
              isInitialized: true,
            },
            false,
            "auth/logout/success"
          );

          _setSuccess("logout", true);
          return { success: true };
        } catch (err) {
          const message = err?.message || "Logout failed.";
          _setError("logout", message);
          return { success: false, error: message };
        } finally {
          _setLoading("logout", false);
        }
      },

      deleteAccount: async () => {
        const { _setLoading, _setError, _setSuccess } = get();

        _setLoading("deleteAccount", true);
        _setError("deleteAccount", null);
        _setSuccess("deleteAccount", false);

        try {
          await delay(1000);
          const response = await fetch(`${BASE_URL}/delete-account`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(await extractErrorMessage(response, "Account deletion failed"));
          }
          await signOut(auth);

          set({...initialState,
              isInitialized: true,
            },
            false,
            "auth/deleteAccount/success"
          );

          _setSuccess("deleteAccount", true);
          return { success: true };
        } catch (err) {
          const message = err?.message || "Account deletion failed.";
          _setError("deleteAccount", message);
          return { success: false, error: message };
        } finally {
          _setLoading("deleteAccount", false);
        }
      },

      reset: () =>
        set({...initialState,
            isInitialized: true,
          },
          false,
          "auth/reset"),
    }),
    { name: "AuthStore" }
  )
);

export default useAuthStore;
