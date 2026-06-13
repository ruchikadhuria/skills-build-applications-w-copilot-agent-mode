import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const navItems = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ]
  const isCodespaceConfigured = Boolean(import.meta.env.VITE_CODESPACE_NAME)

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">Octofit Tracker</h1>
        <p className="text-body-secondary mb-3">
          Presentation tier for teams, activity logs, and workout insights.
        </p>
        {!isCodespaceConfigured && (
          <div className="alert alert-warning py-2 mb-3" role="alert">
            <strong>VITE_CODESPACE_NAME is not set.</strong> API calls use
            <code> http://localhost:8000 </code>as a fallback.
          </div>
        )}
        <nav className="d-flex flex-wrap gap-2" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
