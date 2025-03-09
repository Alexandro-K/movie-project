import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSearchContext } from '../Context/SearchContext'

const NavBar = () => {
  const { searcQuery, setSearchQuery, handleSearch } = useSearchContext();

  const navItems = [
    { path: '/movie-project', link: 'Home' },
    { path: '/favorites', link: 'Favorites' },
    { path: '/topRated', link: 'TopRated' },
  ]


  return (
    <nav className='top-0 h-20 bg-slate-700'>
      <div className="flex justify-between h-full">
        {/* Title (Left Side)*/}
        <div className="my-auto text-4xl text-blue-400 font-bold mx-4">
          <Link to='/'>MyMovies</Link>
        </div>

        {/* Navigation & Search (Right Side) */}
        <div className="flex my-auto gap-4 ">
          {/* Navigation */}
          <ul className="flex gap-4 m-auto">
            {
              navItems.map(({ path, link }) =>
                <li className='text-blue-400 hover:text-blue-500 text-lg font-semibold' key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-blue-400 hover:text-blue-500 text-lg font-semibold ${isActive ? 'underline underline-offset-4 decoration-2 text-blue-500' : ''}`
                    }
                  >
                    {link}
                  </NavLink>
                </li>
              )
            }
          </ul>
          {/* Search */}
          <form action="" onSubmit={handleSearch} className='flex gap-4 mr-4'>
            <input type="text" value={searcQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search movies here...' className='p-2 border rounded-md text-white border-blue-400 placeholder-blue-100 focus:outline-none' />
            <button type='submit' className='bg-blue-400 text-white px-4 rounded-md cursor-pointer'>Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar