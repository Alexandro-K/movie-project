import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSearchContext } from '../Context/SearchContext'
import { Search } from 'react-feather';

const NavBar = () => {
  const { searchQuery, setSearchQuery, handleSearch, searchActive, setSearchActive } = useSearchContext();

  const navItems = [
    { path: `/`, link: 'Home' },
    { path: `/favorites`, link: 'Favorites' },
    { path: `/topRated`, link: 'TopRated' },
  ];

  const [hamburgerActive, setHamburgerActive] = useState(false);

  // UseRef digunakan untuk mentarget elemen itu sendiri
  const hamburgerRef = useRef(null);
  const navMenuRef = useRef(null);
  const searchButtonRef = useRef(null);
  const searchFormRef = useRef(null);
  
  function handleHamburger(){
    setHamburgerActive(!hamburgerActive);
  }

  function handleSearchBar(){
    setSearchActive(!searchActive);
  }

  useEffect(() => {
    function handleClickOutside(event){

      // Hamburger
      if(hamburgerRef.current && navMenuRef.current && !hamburgerRef.current.contains(event.target) && !navMenuRef.current.contains(event.target)){
        setHamburgerActive(false);
      }

      // Search Form
      if(searchButtonRef.current && searchFormRef.current && !searchButtonRef.current.contains(event.target) && !searchFormRef.current.contains(event.target)){
        setSearchActive(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }

  }, [])

  return (
    <nav className='top-0 h-20 z-999 bg-slate-700 relative'>
      <div className="flex justify-between items-center h-full w-full">
        {/* Title (Left Side)*/}
        <div className="flex-1">
          <Link to={`/`} className="text-4xl text-blue-400 font-bold mx-4">MyMovies</Link>
        </div>

        {/* Hamburger Icon For Mobile */}
        <button ref={hamburgerRef} onClick={handleHamburger} id='hamburger' name='hamburger' type='button' className={`${hamburgerActive ? 'hamburger-active ' : ''}block absolute right-16 p-5 lg:hidden`}>
          <span className='hamburger-line transition duration-300 ease-in-out origin-top-left'></span>
          <span className='hamburger-line transition duration-300 ease-in-out '></span>
          <span className='hamburger-line transition duration-300 ease-in-out origin-bottom-left'></span>
        </button>


        {/* Navigation & Search (Right Side) */}
        <nav className="lg:flex-1 lg:flex lg:justify-center">
          <div ref={navMenuRef} id='nav-menu' className={`${hamburgerActive ? '' : 'hidden'} bg-blue-100 rounded-xl absolute right-16 top-full w-full max-w-[200px] lg:max-w-full lg:bg-transparent lg:rounded-none lg:static lg:flex`}>
            {/* Navigation */}
            <ul className="block lg:flex gap-4 m-auto">
              {
                navItems.map(({ path, link }) =>
                  <li className='text-blue-400 hover:text-blue-500 text-lg font-semibold m-4' key={path}>
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
          </div>
        </nav>

        {/* Search */}
        <div ref={searchButtonRef} onClick={handleSearchBar} className= 'inline absolute right-2  p-[22px] lg:hidden '>
            <Search color='white' size={32} />
        </div>
        <div className="lg:flex lg:flex-1 lg:items-center">
          <div ref={searchFormRef} className={`${searchActive ? '' : 'hidden'} absolute right-2 mt-10 bg-blue-700 lg:bg-transparent rounded-xl p-4 lg:mt-0 lg:flex`}>
            <form action="" onSubmit={handleSearch} className='flex gap-4 mr-4 h-12 my-auto'>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search movies here...' className='p-2 border rounded-md text-white border-blue-400 placeholder-blue-100 focus:outline-none' />
              <button type='submit' className='bg-blue-400 text-white px-4 rounded-md cursor-pointer'>Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar