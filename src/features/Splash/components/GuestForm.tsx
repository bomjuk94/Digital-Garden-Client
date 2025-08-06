import { useHandleSplashFormClose } from "../event-handlers/login/useHandleSplashFormClose";
import { useHandleGuestSplashFormSubmit } from "../event-handlers/login/useHandleGuestSplashFormSubmit";

const GuestForm = () => {

    const { handleSplashFormClose } = useHandleSplashFormClose()
    const { handleGuestSplashFormSubmit, guestnameRef, formRef } = useHandleGuestSplashFormSubmit()

    return (
        <div>
            <form
                onSubmit={handleGuestSplashFormSubmit}
                ref={formRef}
                className="w-full max-w-md mx-auto p-4 rounded-2xl shadow-md border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] space-y-4 absolute top-thirty-percent left-0 right-0"
            >
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="guestName"
                        className="text-sm font-medium text-[var(--text-primary)]"
                    >
                        🌱 What should we call you?
                    </label>

                    <input
                        ref={guestnameRef}
                        type="text"
                        placeholder="Wanderer, Sage, Luna..."
                        id="guestName"
                        name="guestName"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] transition"
                    />
                </div>

                <p className="text-xs italic leading-snug text-[var(--text-muted)]">
                    Your progress will be saved only in this browser. Create an account later to keep your garden blooming forever. 🌼
                </p>

                <button
                    type="submit"
                    className="w-full py-2 font-semibold rounded-xl shadow bg-[var(--accent-green)] text-white hover:brightness-105 transition cursor-pointer"
                >
                    Start Growing
                </button>


                <button
                    onClick={handleSplashFormClose}
                    className="text-lg cursor-pointer absolute top-1.5 right-3.5"
                    type="button"
                    aria-label="close"
                >X</button>
            </form>
        </div>


    );
};

export default GuestForm;
