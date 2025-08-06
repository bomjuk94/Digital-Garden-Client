import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toolsUrls } from "../utils.ts/constants";
import type { ToolName } from "../types/ToolNameType";
import type { StoreSupply } from '@/features/Store/types';
import { SupplyEffectType } from '@/features/Store/types';

type ToolsStore = {
    toolsHydated: boolean
    cursorToToolActive: boolean
    activeTool: string | null
    toolUrl: string | null
    setCursorToTool: (name: string, effect?: StoreSupply) => void
    setCursorToToolState: (val: boolean) => void
    resetCursor: () => void
    toolEffect: StoreSupply | null
};

// capture set here so we can use it later
let globalSet: ((partial: Partial<ToolsStore>) => void) | null = null;

export const useToolsStore = create<ToolsStore>()(
    persist(
        (set, get) => {
            globalSet = set;

            return {
                toolsHydated: false,
                cursorToToolActive: false,
                activeTool: null,
                toolUrl: null,
                setCursorToTool: (name, effect) => {
                    const url = toolsUrls[name as ToolName];

                    const toolEffect = effect && Object.values(SupplyEffectType).includes(name as SupplyEffectType)
                        ? effect
                        : null;

                    set({
                        cursorToToolActive: true,
                        toolUrl: url,
                        activeTool: name,
                        toolEffect,
                    });
                },
                setCursorToToolState: (val) => set({ cursorToToolActive: val }),
                resetCursor: () => {
                    set({ cursorToToolActive: false, toolUrl: null, activeTool: null, toolEffect: null });
                },
                toolEffect: null,
            };
        },
        {
            name: 'tools-storage',
            onRehydrateStorage: () => {
                return () => {
                    if (globalSet) {
                        globalSet({ toolsHydated: true });
                    }
                };
            }
        }
    )
);
