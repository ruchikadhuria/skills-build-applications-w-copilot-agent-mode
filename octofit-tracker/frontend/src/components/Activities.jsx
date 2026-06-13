import ResourceListPage from './ResourceListPage'

function Activities() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  return <ResourceListPage title="Activities" endpoint={endpoint} />
}

export default Activities
