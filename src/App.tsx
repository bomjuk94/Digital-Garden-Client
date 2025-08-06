import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { routes } from '@shared/navigation/routes'
import ConfirmModal from '@shared/components/modals/ConfirmModal'
import CursorFollower from './shared/components/CursorFollower'
import { useToolsStore } from './shared/stores/useToolsStore'
import { useInputStore } from './shared/stores/useInputStore'
import { usePassiveSale } from './shared/hooks/usePassiveSale'
import { useTrackShopExit } from './shared/hooks/useTrackShopExit'
import { usePlantGrowthManager } from './features/Greenhouse/event-handlers/usePlantGrowthManager'
import { usePassiveSeedGeneration } from './shared/hooks/upgrades/usePassiveSeedGeneration'
import { useProtectedProfile } from './shared/hooks/useProtectedProfile'
import Spinner from './shared/components/Spinner'

function App() {

  const { error, loading } = useProtectedProfile()
  const navigate = useNavigate()
  const { cursorToToolActive, toolUrl } = useToolsStore()
  const handleClick = useInputStore((state) => state.handleGlobalClick)

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  useEffect(() => {
    if (error === "sessionExpired") {
      navigate("/?error=sessionExpired");
    }
  }, [error, navigate]);

  usePassiveSale();
  useTrackShopExit();
  usePlantGrowthManager();
  usePassiveSeedGeneration();

  if (loading) return <Spinner />;

  return (
    <>
      <div className={`${cursorToToolActive ? 'custom-cursor' : ''}`}>
        {
          toolUrl && <CursorFollower img={toolUrl} />
        }
        <Routes>
          {
            routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))
          }
        </Routes>
      </div>

      <ToastContainer
        position={"top-right"}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <ConfirmModal />
    </>
  )
}

export default App
