const validateRegister = (req, res, next) => {
  const firstName = req.body.firstName?.trim();
  const lastName = req.body.lastName?.trim();
  const username = req.body.username?.trim()?.toLowerCase();
  const email = req.body.email?.trim()?.toLowerCase();
  const password = req.body.password;

  if (username) {
    const len = username.length;

    const usernameRegex = /^[a-z0-9]{3,20}$/

    if (len < 3 || len > 20 && !usernameRegex.test(username)) {

      return res.status(400).json({
        success: false,
        message: "Username must be 3-20 characters and contain only lowercase letters and numbers."
      })
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Username required"
    })
  }

  if (email) {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email"
      })
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Phone or Email is required"
    });
  }

  if (firstName) {
    const len = firstName.length;

    if (len < 3 || len > 50) {
      return res.status(400).json({
        success: false,
        message: "First Name length must be between 3 to 50"
      })
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "First Name is required"
    });
  }

  if (lastName) {
    const len = lastName.length;

    if (len < 3 || len > 50) {
      return res.status(400).json({
        success: false,
        message: "Last Name must be under 50 characters"
      })
    }


  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password required"
    })
  }

  req.body.firstName = firstName;
  req.body.lastName = lastName;
  req.body.username = username;
  req.body.email = email;

  next();
}

export default validateRegister