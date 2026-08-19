import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

export interface SectionVisibleState {
  sectionVisibleValue: string;
}

export interface ContextState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  sectionVisible: SectionVisibleState;
  changeSectionVisible: (sectionId: string) => void;
}

const updateDOMDarkMode = (isDark: boolean): void => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  root.style.colorScheme = isDark ? "dark" : "light";
  root.setAttribute("data-theme", isDark ? "dark" : "light");
};

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// Dummy storage para evitar que Next.js crashee en el servidor (SSR)
const dummyStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useContextStore = create<ContextState>()(
  persist(
    (set) => ({
      darkMode: getInitialDarkMode(),

      toggleDarkMode: () =>
        set((state) => {
          const nextValue = !state.darkMode;
          updateDOMDarkMode(nextValue);
          return { darkMode: nextValue };
        }),

      setDarkMode: (isDark) =>
        set(() => {
          updateDOMDarkMode(isDark);
          return { darkMode: isDark };
        }),

      sectionVisible: {
        sectionVisibleValue: "",
      },

      changeSectionVisible: (sectionId: string) =>
        set(() => ({
          sectionVisible: {
            sectionVisibleValue: sectionId,
          },
        })),
    }),
    {
      name: "app-theme-context",
      // Protección: Solo usa localStorage si estamos en el navegador
      storage: createJSONStorage(() => 
        typeof window !== "undefined" ? window.localStorage : dummyStorage
      ),
      onRehydrateStorage: () => (state) => {
        if (state) {
          updateDOMDarkMode(state.darkMode);
        }
      },
    }
  )
);

// ELIMINAMOS la exportación de `contextStore` para obligar a usar las reglas de Hooks