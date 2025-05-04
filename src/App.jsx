import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'
import { MovieProvider } from './Context/MovieContext.jsx'
import TopRated from './pages/TopRated.jsx'
import SearchResult from './pages/SearchResult.jsx'
import MovieDetail from './pages/MovieDetail.jsx'

function App() {
  return (
      <SearchProvider>
        <MovieProvider>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/topRated" element={<TopRated />} />
              <Route path="/searchResult" element={<SearchResult />} />
              {/* Navigate pada card mengecek untuk path apakah sama atau tidak
                  dan memilih untuk memunculkan komponen ini karena sesuai dengan
                  isi navigate(pada movie card) */}
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </main>
        </MovieProvider>
      </SearchProvider>
  )
}

export default App
