const validateUsername = (req, res, next) => {
  const username = req.query?.username?.trim()?.toLowerCase();

  if (!username) {
    return res.status(400).json({
      success: true,
      message: "Username required"
    })
  }

  const usernameRegex = /^[a-z0-9]{3,20}$/;

  const testUsername = usernameRegex.test(username);

  if (!testUsername) {
    return res.status(400).json({
      success: true,
      message: "Username should be a alphanumerical value between 3-20 length."
    })
  }

  req.query.username = username;

  next();
}

export default validateUsername