import React, { useRef, useState } from "react";
import Header from "./Header";
import { Validate } from "../utils/Validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            displayName: name.current.value, photoURL: "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABQ4LOvygKmDJF0g-LpT3uBYVau-oMJXHKFCtGX2-j49KAJsAB_Jtmkbl4LGtLG7Z_xrp_KaEcMz0Jtxn4fjHzhBXs8NPH3Q.png?r=e55"
          }).then(() => {
            // Profile updated!
            const {uid , email , displayName , photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid , email:email , displayName: displayName , photoURL: photoURL}))
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });
          console.log(user)
          
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
        console.log(user)
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage)

        
      })
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className=" h-screen w-screen "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
          alt="picture"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-[500px] bg-black my-48 mx-auto right-0 left-0 bg-opacity-80 text-white px-4 py-4 flex flex-col space-y-6 rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4 px-12">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray "
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
