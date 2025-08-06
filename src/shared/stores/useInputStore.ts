import { create } from 'zustand';

type InputStore = {
    lastClickTarget: HTMLElement | null;
    lastClickCoords: { x: number; y: number };
    isClickValid: boolean;
    handleGlobalClick: (e: MouseEvent) => void;
};

export const useInputStore = create<InputStore>((set) => ({
    lastClickTarget: null,
    lastClickCoords: { x: 0, y: 0 },
    isClickValid: false,
    handleGlobalClick: (e) => {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const interactableEl = target?.closest(".interactable");
        const isValid = Boolean(interactableEl);

        set({
            lastClickTarget: target as HTMLElement | null,
            lastClickCoords: { x: e.clientX, y: e.clientY },
            isClickValid: isValid,
        });

        if (!isValid) {
            import('./useToolsStore').then(({ useToolsStore }) =>
                useToolsStore.getState().resetCursor()
            );
        }
    },
}));
