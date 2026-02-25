import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import TicketsPage from './components/pages/TicketsPage'
import ShowDetailPage from './components/pages/ShowDetailsPage'
import EventsPage from './components/pages/EventsPage'
import ComediansPage from './components/pages/ComediansPage'
import ScrollToTop from './components/scroll-to-top'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/:id" element={<ShowDetailPage />} /> {/* 👈 dynamic route */}
        <Route path="/comedians" element={<ComediansPage />} />
      </Routes>
    </Router>
  )
}

export default App
