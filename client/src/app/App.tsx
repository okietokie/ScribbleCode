import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import MapPage from './pages/MapPage'
import AchievementsPage from './pages/AchievementsPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="map/:worldId?" element={<MapPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
