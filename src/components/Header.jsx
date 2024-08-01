

import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { goForSearch } from '../utils/GPTSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.gptSearch);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/");
    }).catch((error) => {
      navigate("/error",error);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGPTSearch = () => {
    dispatch(goForSearch());
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MenuItems = () => (
    <>
      {showGptSearch && (
        <select className="p-4 mx-2 md:mx-0 rounded-xl md:px-3 bg-gray-900 my-2 md:my-0 text-white" onChange={handleChangeLanguage}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option  key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={handleGPTSearch}
        className="text-white my-4 md:my-0 mx-2 text-lg md:text-sm bg-red-500 px-7 mr-1 ml-18 md:px-8 md:py-4 md:mr-3 md:ml-3 rounded-md md:font-bold"
      >
        {showGptSearch ? "Home" : "GPT-Search"}
      </button>
      <img className="hidden md:block w-10 h-10 rounded-full" src={user.photoURL} alt="User" />
      <button
        onClick={handleSignOut}
        className="font-bold my-4 md:my-0 px-4 text-white md:px-2 md:pr-16"
      >
        Sign Out
      </button>
    </>
  );

  return (
    <div className="absolute bg-gradient-to-b from-black w-screen z-30 flex justify-between">
      <img
        className={`w-44 md:w-56 mx-4 md:mx-12 ${user && "w-16 my-4 md:my-0 h-10 md:h-24 md:w-56"}`}
        src="../1.png"
        alt="logo"
      />

      {user && (
        <div className="relative">
          <div className="flex justify-between items-center p-3 bg-transparent hover:bg-gray-900 my-4 mx-2 rounded md:rounded-xl">
            <div className="flex items-center">
              <button
                className="text-white md:hidden"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            <div className="hidden md:flex items-center">
              <MenuItems />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-2/4 h-full bg-gray-900 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden z-50`}
          >
            <div className="flex justify-between items-center p-3">
              <h1 className="text-white text-xl"></h1>
              <button className="text-white" onClick={toggleMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-start py-4 px-2">
              <MenuItems />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

