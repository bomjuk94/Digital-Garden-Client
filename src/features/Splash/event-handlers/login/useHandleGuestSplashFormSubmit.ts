import { useRef } from "react";
import { useGuestUserCreation } from "./useGuestUserCreation";
import { showToast } from "@/shared/utils.ts/showToast";

export const useHandleGuestSplashFormSubmit = () => {

    const guestnameRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const { createGuestUser } = useGuestUserCreation()

    const handleGuestSplashFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!guestnameRef.current?.value.trim()) {
            showToast('error', 'Please enter a username to begin your journey 🌱')
            return
        }
        const data = {
            username: guestnameRef.current.value.trim(),
        }

        await createGuestUser(data)
        formRef.current?.reset()
    }

    return {
        handleGuestSplashFormSubmit,
        guestnameRef,
        formRef,
    }
}