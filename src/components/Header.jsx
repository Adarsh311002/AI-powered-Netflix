import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/Firebase';
import { useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, options, SUPPORTED_LANGUAGES } from '../utils/constants';
import { goForSearch } from '../utils/GPTSlice';
import { changeLanguage } from '../utils/configSlice';






const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector(store => store.gpt.gptSearch)
  
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
     
    }).catch((error) => {
      // An error happened.
      navigate("/error")

    });
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid , email , displayName , photoURL} = user;
          dispatch(addUser({uid:uid , email:email , displayName: displayName , photoURL: photoURL}))
          navigate("/browse")
          // ...
        } else {
          dispatch(removeUser())
          navigate("/")
        }
      });

      return() => unsubscribe()

   },[])

   const handeleGPTSearch = () => {
    dispatch(goForSearch())
   }

   const handleChangeLanguage = (e) => {
    // console.log(e.target.value)
    dispatch(changeLanguage(e.target.value))
   }

  return (
    <div className="absolute bg-gradient-to-b from-black w-screen z-30 flex justify-between">
      <img
        className={`w-36 md:w-56 mx-4  md:mx-12  ${user && "w-16 h-12 md:h-24 md:w-56 "}`}
        src="../src/assets/1.png"
        alt="logo"
      />

      {user && (
        <div className="my-3 md:my-5 md:h-12 h-6 text-sm mr-2 flex">
        {showGptSearch && <select className="p-2  md:px-3 hidden bg-gray-900 text-white" onChange={handleChangeLanguage}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier} >
              {lang.name}
            </option>
          ))}
        </select>}
          <button
            onClick={handeleGPTSearch}
            className="text-white text-sm bg-red-500 px-2 mr-1 ml-18 md:px-6 md:mr-2 rounded-md md:font-bold"
          >
            {showGptSearch ? "Home" : "GPT-Search"}
          </button>
          <img className='hidden md:block' src={user.photoURL} alt="signout" />
          <button
            onClick={handleSignOut}
            className="font-bold text-white md:px-2 md:pr-16"
          >
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
}

export default Header
