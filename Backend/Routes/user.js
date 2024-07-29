const express = require("express");
const router = express.Router();
const userSchema = require("../Schema/Schema");
const { hashPassword, decryptPassword } = require("../helper/bcryptfile");
const { transporter } = require("../Nodemailer/nodemailer");
const upload = require("../helper/Multer");

let Users = [];

router.post("/user", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    let userAlreadyExists = await userSchema.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(400).send({ message: "User Already exist" });
    }
    const hashedPassword = await hashPassword(password);

    const newUser = new userSchema({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    Users = Users.concat(savedUser);

    return res.status(200).send({
      success: true,
      data: savedUser,
      all: Users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/sendVerificationEmail", async function (req, res, next) {
  try {
    const { email } = req.body;
    console.log(email);
    let user = await userSchema.findOne({ email });
    console.log(email);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateVerificationToken(length) {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const verificationToken = generateVerificationToken(5);
    user.resetToken = verificationToken;
    await user.save();
    const verificationLink = `http://localhost:3000/resetpassword/${verificationToken}`;
    const mailOptions = {
      from: "coolgujjarboyabhinav@gmail.com",
      to: user.email,
      subject: "Account Verification",
      text: `Please click on the following link to verify your account: ${verificationLink}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Failed to send verification email",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .send({ success: true, message: "Verification email sent" });
      }
    });
  } catch (err) {
    console.error("Error in /sendVerificationEmail:", err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});
router.put("/resetPassword", async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;
    console.log();
    let user = await userSchema.findOne({ resetToken });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }
    
    if (user.resetToken !== resetToken) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.resetToken = undefined;

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error in /resetPassword:", err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});


router.delete("/user/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const deletedUser = await userSchema.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    Users = Users.filter((user) => user._id.toString() !== userId);

    return res.status(200).send({
      success: true,
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log("password", password, user.password);
    const isMatch = await decryptPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.status(200).json({ msg: "Signed in successfully" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

router.post("/upload", upload.single("adminPic"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  return res.status(200).json({
    message: "File uploaded successfully.",
    file: req.file,
  });
});

module.exports = router;
