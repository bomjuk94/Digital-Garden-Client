import { useHandleSplashFormClose } from "../event-handlers/login/useHandleSplashFormClose";
import { useHandleUserSplashFormSubmit } from "../event-handlers/login/useHandleUserSplashFormSubmit";

const UserForm = () => {

    const { handleSplashFormClose } = useHandleSplashFormClose()
    const {
        handleUserFormSubmit,
        usernameRef,
        userPassword,
        formRef
    } = useHandleUserSplashFormSubmit()

    return (
        <div className="absolute top-thirty-percent left-0 right-0">
            <form
                onSubmit={handleUserFormSubmit}
                ref={formRef}
                className="w-full max-w-md mx-auto p-4 rounded-2xl shadow-md border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] space-y-4 relative"
            >
                <input type="hidden" name="mode" value="login" />
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="userName"
                        className="text-sm font-medium text-[var(--text-primary)]"
                    >
                        🌱 Enter your username
                    </label>

                    <input
                        type="text"
                        placeholder="Wanderer, Sage, Luna..."
                        id="userName"
                        name="userName"
                        ref={usernameRef}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-[var(--text-primary)]"
                    >
                        🌱 Enter your password
                    </label>

                    <input
                        type="text"
                        id="password"
                        name="password"
                        ref={userPassword}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] transition"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        type="submit"
                        name="mode"
                        value="login"
                        className="w-full py-2 font-semibold rounded-xl shadow bg-[var(--accent-green)] text-white hover:brightness-105 transition cursor-pointer"
                    >
                        Login
                    </button>

                    <button
                        type="submit"
                        name="mode"
                        value="register"
                        className="w-full py-2 font-semibold rounded-xl shadow bg-[var(--accent-purple)] text-white hover:brightness-105 transition cursor-pointer"
                    >
                        Register
                    </button>
                </div>

                <button
                    onClick={handleSplashFormClose}
                    className="text-lg cursor-pointer absolute top-1.5 right-3.5"
                >X</button>
            </form>
        </div>
    );
};

export default UserForm;
