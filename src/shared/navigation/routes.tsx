// routes.ts
import SplashPage from '@features/Splash/pages/Splash'
import GreenHousePage from '@/features/Greenhouse/pages/GreenHouse'
import GardenPage from '@features/Garden/pages/Garden'
import ShopPage from '@features/Shop/pages/Shop'

export const routes = [
    {
        path: '/',
        element: <SplashPage />,
    },
    {
        path: '/green-house',
        element: <GreenHousePage />,
    },
    {
        path: '/garden',
        element: <GardenPage />,
    },
    {
        path: '/shop',
        element: <ShopPage />,
    },
]
