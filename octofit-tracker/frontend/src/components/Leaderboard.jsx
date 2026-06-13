import ResourceListPage from './ResourceListPage'

function Leaderboard() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  return <ResourceListPage title="Leaderboard" endpoint={endpoint} />
}

export default Leaderboard
