import React, { useRef, useState } from "react";
import Header from "./Header";
import { Validate } from "../utils/Validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/Firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { HOME_BG, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const toggleSignForm = (e) => {
    setIsSignInForm(!isSignInForm);
  };

  const handleValidation = () => {
    // console.log(email.current.value)
    // console.log(password.current.value)

    const message = Validate(email.current.value, password.current.value);
    // console.log(message)

    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //SignUP
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() => {
            // Profile updated!
            const {uid , email , displayName , photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid , email:email , displayName: displayName , photoURL: photoURL}))
          
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });
          // console.log(user)
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
          
        });
    } else {
      //SignIn
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage)

        
      })
    }
  };

  return (

<div className="relative w-full min-h-screen flex items-center justify-center">
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={HOME_BG}
      alt="background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" /> {/* Optional overlay */}
  </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute md:w-[500px] bg-black my-40 md:my-48 mx-6 md:mx-auto right-0 left-0 bg-opacity-80 text-white md:px-4 py-4 flex flex-col space-y-6 rounded-lg"
      >
         <div className="flex justify-center  ">
            Github repo Link :
          <a
            className="px-3"
            href="https://github.com/Adarsh311002/AI-powered-Netflix"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Repo"
              className="w-7 h-7 hover:scale-110 transition-transform duration-200 rounded-2xl"
            />
          </a>
        </div>
        <h1 className="font-bold text-3xl md:text-4xl py-2 md:py-4 px-12">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            className=" bg-opacity-70 bg-[#282727]  m-12 p-4 rounded-md border-[0.5px] border-gray "
            type="text"
            placeholder="Full name"
          />
        )}
        <input
          ref={email}
          className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray "
          type="email"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray "
          type="password"
          placeholder="Password"
        />
        <p className="text-red-600 m-12">{errorMessage}</p>
        <button
          className="bg-[#e50914] m-12 p-3 rounded-md "
          onClick={handleValidation}
        >
          {isSignInForm ? "Sign In" : "Sign up"}
        </button>
        <button onClick={toggleSignForm} className="m-4 py-6">
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already a user? Sign in"}
        </button>
         
      </form>
    </div>
  );
};

export default Login;
