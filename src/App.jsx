import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'
import { MovieProvider } from './Context/MovieContext.jsx'
import TopRated from './pages/TopRated.jsx'
import SearchResult from './pages/SearchResult.jsx'

function App() {
  return (
    <Router basename="/movie-project">
      <SearchProvider>
        <MovieProvider>
          <NavBar />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/topRated' element={<TopRated />} />
              <Route path='/searchResult' element={<SearchResult />} />
            </Routes>
          </main>
        </MovieProvider>
      </SearchProvider>
    </Router>
  )
}

export default App
