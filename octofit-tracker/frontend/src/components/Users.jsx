import ResourceListPage from './ResourceListPage'

function Users() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  return <ResourceListPage title="Users" endpoint={endpoint} />
}

export default Users
