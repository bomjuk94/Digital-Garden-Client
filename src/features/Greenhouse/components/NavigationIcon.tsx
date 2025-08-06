import { useLocation } from 'react-router-dom'
import { navigationIcon } from '@assets/overlay'
import { routes } from '@/shared/navigation/routes'
import { NavLink } from 'react-router-dom'
import { capitalizeName } from '@/shared/utils.ts/capitalizeName'
import { cleanString } from '@/shared/utils.ts/cleanString'
import { useNavigationStore } from '@/shared/stores/useNavigationStore'

const NavigationIcon = () => {

    const location = useLocation()
    const { showNavigation, toggleNavigation } = useNavigationStore()
    const handleShowNavigation = () => {
        toggleNavigation()
    }

    return (
        <div className='relative'>
            {
                showNavigation &&

                <div
                    className="
                    bg-[var(--border)] rounded-twenty 
                    border-[var(--accent-green)] py-1.5 px-2.5
                    absolute -top-12 right-hundred-fifteen-percent
                    w-max
                    "
                >

                    <ul className="flex flex-col gap-1">
                        {routes.map((route) => {
                            if (route.path === location.pathname) return null;

                            const label =
                                route.path === '/'
                                    ? 'Home'
                                    : capitalizeName(cleanString(route.path));

                            return (
                                <li key={route.path}>
                                    <NavLink
                                        to={route.path}
                                        onClick={() => toggleNavigation()}
                                        className="hover:text-[var(--accent-green)] transition ease-in-out duration-150"
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                </div>
            }


            <button
                onClick={handleShowNavigation}
            >
                <img
                    src={navigationIcon}
                    alt="Navigation Icon"
                    className='w-10 cursor-pointer'
                />
            </button>
        </div>
    )
}

export default NavigationIcon