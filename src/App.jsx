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
      <SearchProvider>
        <MovieProvider>
          <NavBar />
          <main>
            <Routes>
              <Route path={`${import.meta.env.BASE_URL}`} element={<Home />} />
              <Route path={`${import.meta.env.BASE_URL}favorites`} element={<Favorites />} />
              <Route path={`${import.meta.env.BASE_URL}topRated`} element={<TopRated />} />
              <Route path={`${import.meta.env.BASE_URL}searchResult`} element={<SearchResult />} />
            </Routes>
          </main>
        </MovieProvider>
      </SearchProvider>
  )
}

export default App
