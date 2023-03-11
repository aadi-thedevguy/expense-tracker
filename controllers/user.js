const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please Add all Fields" });
  }

  try {
    // check if user exists
    const userExits = await User.findOne({ where: { email } });

    if (userExits) {
      res.status(400).json({ msg: "User Already Exits" });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ msg: "Invalid user Data" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    let decryptedPass = await bcrypt.compare(password, user.password);
    if (user && decryptedPass) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// generate JWT
const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn : '30d'
  })
}
