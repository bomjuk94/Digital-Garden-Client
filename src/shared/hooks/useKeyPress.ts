import { useEffect } from "react";
import type { KeyPressProps } from "../types/props/KeyPressProps";

export const useKeyPress = ({ func }: KeyPressProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") func()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [func])
}