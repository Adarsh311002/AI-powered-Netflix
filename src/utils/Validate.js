

export const Validate = (email,password) => {
 
    const emailValidate = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)
    const passwordValidate = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(password)

    if(!emailValidate) return "Email id is not valid"
    if(!passwordValidate) return "Password not valid"

    return null


  
}

