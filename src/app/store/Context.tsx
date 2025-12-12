import { create } from 'zustand'

type SectionVisible = {
    sectionVisibleValue: string
}

type ContextState = {
    darkMode: boolean,
    changeDarkMode: React.MouseEventHandler<HTMLButtonElement>
    sectionVisible: SectionVisible,
    changeSectionVisible: (value: string | {}) => void
}

export const contextStore = create<ContextState>(set => ({
    darkMode: true,
    changeDarkMode: (): void => set((state: ContextState): { darkMode: boolean } => ({ darkMode: !state.darkMode })),

    sectionVisible: {
        sectionVisibleValue: ""
    },

    changeSectionVisible: (newSectionVisible: String): void => set((state: ContextState) => ({ sectionVisible: { ...state.sectionVisible, ...newSectionVisible } })),
}))