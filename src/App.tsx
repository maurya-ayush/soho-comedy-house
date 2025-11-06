import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import EventsPage from './components/pages/EventsPage'
import ShowDetailPage from './components/pages/ShowDetailsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<ShowDetailPage />} /> {/* 👈 dynamic route */}
      </Routes>
    </Router>
  )
}

export default App
