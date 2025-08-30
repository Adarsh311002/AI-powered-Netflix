import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { Validate } from "../utils/Validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { HOME_BG, USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to browse page
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid, email, displayName, photoURL}));
        navigate("/browse");
      }
    });
    
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const toggleSignForm = (e) => {
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };

  const handleValidation = () => {
    // Clear previous errors
    setErrorMessage(null);
    
    // Validate inputs
    const message = Validate(email.current.value, password.current.value);
    if (message) {
      setErrorMessage(message);
      return;
    }

    setIsLoading(true);

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid, email, displayName, photoURL}));
            navigate("/browse");
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // User signed in successfully
          const user = userCredential.user;
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid, email, displayName, photoURL}));
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleValidation();
        }}
        className="absolute md:w-[500px] bg-black my-40 md:my-48 mx-6 md:mx-auto right-0 left-0 bg-opacity-80 text-white md:px-4 py-4 flex flex-col space-y-6 rounded-lg"
      >
        <div className="flex justify-center">
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
            className="bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray"
            type="text"
            placeholder="Full name"
            required={!isSignInForm}
          />
        )}
        
        <input
          ref={email}
          className="bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray"
          type="email"
          placeholder="Email or mobile number"
          required
        />
        
        <input
          ref={password}
          className="bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray"
          type="password"
          placeholder="Password"
          required
        />
        
        {errorMessage && (
          <p className="text-red-600 m-12 mt-0">{errorMessage}</p>
        )}
        
        <button
          type="submit"
          className="bg-[#e50914] m-12 p-3 rounded-md disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : (isSignInForm ? "Sign In" : "Sign up")}
        </button>
        
        <button 
          type="button"
          onClick={toggleSignForm} 
          className="m-4 py-6 text-gray-300 hover:text-white"
        >
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already a user? Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;