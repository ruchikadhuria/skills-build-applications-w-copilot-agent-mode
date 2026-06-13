import ResourceListPage from './ResourceListPage'

function Workouts() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  return <ResourceListPage title="Workouts" endpoint={endpoint} />
}

export default Workouts
