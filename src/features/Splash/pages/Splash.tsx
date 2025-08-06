import { useEffect } from "react";
import { useHandleSplashBtn } from "../event-handlers/login/useHandleSplashBtn";
import GuestForm from "../components/GuestForm";
import UserForm from "../components/UserForm";
import { useUserModeStore } from '@/shared/stores/useUserModeStore'
import { useTutorialStore } from "@/shared/stores/useTutorialStore";
import { useToolsStore } from "@/shared/stores/useToolsStore";

const Splash = () => {

    const { handleSplashBtn } = useHandleSplashBtn()
    const userMode = useUserModeStore((state) => state.userMode)
    const resetTutorial = useTutorialStore((state) => state.resetTutorialIndex)
    const { resetCursor } = useToolsStore()

    useEffect(() => {
        useUserModeStore.getState().setUserMode(null)
    }, [])

    useEffect(() => {
        resetTutorial()
    }, [resetTutorial])

    useEffect(() => {
        resetCursor()
    }, [resetCursor])

    return (
        <div className='bg-[var(--bg-primary)] h-dvh flex flex-col justify-center'>
            <div className='min-w-desktop-width max-w-desktop-width min-h-desktop-height max-h-desktop-height mx-auto bg-splash rounded-twenty relative'>

                {
                    !userMode &&
                    <div className="flex gap-3 items-center justify-center absolute top-sixty-five-percent left-0 right-0">
                        <button
                            onClick={(e) => handleSplashBtn(e)}
                            value={'registered'}
                            className="bg-[var(--soil)] hover:bg-[var(--accent-mint)] text-[var(--bg-primary)] hover:text-[var(--text-primary)] font-medium px-5 py-2.5 rounded-lg border border-[var(--border)] shadow-sm transition duration-200 ease-in-out cursor-pointer"
                        >
                            Login /Register
                        </button>

                        <button
                            onClick={(e) => handleSplashBtn(e)}
                            value={'guest'}
                            className="bg-[var(--soil)] hover:bg-[var(--accent-mint)] text-[var(--bg-primary)] hover:text-[var(--text-primary)] font-medium px-5 py-2.5 rounded-lg border border-[var(--border)] shadow-sm transition duration-200 ease-in-out cursor-pointer">
                            Continue as Guest
                        </button>
                    </div>
                }
                {
                    userMode && (
                        userMode === 'guest' ? <GuestForm /> : <UserForm />
                    )
                }
            </div>
        </div>
    )
}

export default Splash