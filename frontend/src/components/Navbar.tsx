import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiPlus, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { FaCar } from 'react-icons/fa';
import logo from '../assets/logo.png';
import profile from '../assets/default-profile_image.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/')
  };
  console.log(user?.role)

  const navLinks = [
    // { text: "Become a renter", path: "/become-a-renter" },
    { text: "Rental deals", path: "/rental-deals" },
    { text: "How it works", path: "/how-it-works" },
    { text: "Why choose us", path: "/why-choose-us" }
  ];

  // Show a loading state or return null while checking authentication
  if (loading) {
    return (
      <header className="bg-white shadow-md  z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="uppercase text-blue-500 font-bold text-2xl md:text-3xl lg:text-4xl">
              RENTCARS
            </Link>
            <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="uppercase flex items-center justify-center gap-2 text-blue-400 font-bold text-2xl md:text-3xl lg:text-4xl">
            <img src={logo} alt="" className='h-14' />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-6 mr-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {user.name && (
                    <img
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium"
                      src={user.profileImage != "" ? user.profileImage : profile}
                    />
                  )}
                  <span className="font-medium text-gray-800">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                    {user.role === 'renter' && (
                      <>
                         <Link
                          to="/add-car"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiPlus className="text-blue-500" />
                          <span>Add a Car</span>
                        </Link>

                         <Link
                          to="/my-cars"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaCar className="text-gray-500" />
                          <span>My cars</span>
                        </Link> 


                        {/* <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                          <FiMenu className="text-gray-500" />
                          <span>Dashboard</span>
                        </Link> */}
                      </>
                    )}

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >

                      <FiSettings className="text-gray-500" />
                      <span>Account Settings</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/signin" className="text-gray-800 hover:text-blue-500 font-medium">Sign in</Link>
                <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg">Sign up</Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden text-gray-700">
            {isMenuOpen ? <FiX className="h-8 w-8" /> : <FiMenu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white absolute w-full shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4 mb-6 border-b border-gray-200 pb-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 block py-2"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth section for mobile */}
          {isAuthenticated && user ? (
            <div className="flex flex-col space-y-3 pb-4">
              <div className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              {user.role === 'renter' && (
                <>
                   <Link
                    to="/add-car"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FiPlus className="text-blue-500" />
                    <span>Add a Car</span>
                  </Link>
                  

                  <Link
                    to="/my-cars"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaCar className="text-gray-500" />
                    <span>My cars</span>
                  </Link> 

                  <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 py-2" onClick={() => setIsMenuOpen(false)}>
                    <FiMenu className="text-gray-500" />
                    <span>Dashboard</span>
                  </Link>
                </>
              )}


              <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 py-2" onClick={() => setIsMenuOpen(false)}>
                <FiSettings className="text-gray-500" />
                <span>Account Settings</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 py-2">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pb-4">
              <Link to="/signin" className="text-gray-800 hover:text-blue-500 py-2 block" onClick={() => setIsMenuOpen(false)}>Sign in</Link>
              <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-md text-center" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;