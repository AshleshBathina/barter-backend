
const validateLogin = (req, res, next) => {
  const id = req.body.id?.trim()?.toLowerCase();
  const password = req.body.password;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "userId required"
    })
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password required"
    })
  }

  req.body.id = id;
  next();
}

export default validateLogin;