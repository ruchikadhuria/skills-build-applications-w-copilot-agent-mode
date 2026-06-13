import ResourceListPage from './ResourceListPage'

function Teams() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  return <ResourceListPage title="Teams" endpoint={endpoint} />
}

export default Teams
