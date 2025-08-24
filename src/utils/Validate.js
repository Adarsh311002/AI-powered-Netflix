
export const Validate = (email, password) => {
  const emailValidate = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);

  if (!emailValidate) return "Email id is not valid";

  if (!password || password.length === 0) return "Password cannot be empty";

  return null;
};


