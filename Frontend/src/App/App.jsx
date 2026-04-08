import { Provider } from 'react-redux'
import { store } from './app.store'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useEffect } from 'react'
import { useAuth } from '../Features/Auth/Hooks/useAuth'
function App() {
  const { getuser } = useAuth()
  useEffect(() => {
    getuser()
  }, [])
  return <RouterProvider router={router} />
}

export default App
