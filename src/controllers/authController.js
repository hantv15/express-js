const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
   // REGISTER
   registerUser: async (req, res) => {
      try {
         const salt = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash(req.body.password, salt);

         //Create new user
         const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
         });

         // //Save user to DB
         const user = await newUser.save();
         res.status(200).json(user);
      } catch (err) {
         res.status(500).json(err);
      }
   },

   // Login user
   loginUser: async (req, res) => {
      try {
         const user = await User.findOne({ username: req.body.username });
         if (!user) {
            res.status(404).json("Wrong username");
         }
         const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
         );
         if (!validPassword) {
            res.status(404).json("Wrong password");
         }

         if (user && validPassword) {
            const accessToken = jwt.sign({
               id: user.id,
               admin: user.admin,
            },
               "secret",
               {
                  expiresIn: "30s"
               }
            );
            res.status(200).json(user);
         }
      } catch (err) {
         res.status(500).json(err)
      }
   }
}

module.exports = authController;
