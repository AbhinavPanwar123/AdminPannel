const express = require("express");
const router = express.Router();
const adminSchema = require("../Schema/Schema");
const { hashPassword, decryptPassword } = require("../helper/bcryptfile");
const { transporter } = require("../Nodemailer/nodemailer");
const upload = require("../helper/Multer");
const sellerSchema = require("../Schema/sellerSchema");

let Users = [];
let Sellers = [];

//Random Token
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateVerificationToken(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const verificationToken = generateVerificationToken(5);

//AdminSignup
router.post("/adminSignup", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    let userAlreadyExists = await adminSchema.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(400).send({ message: "User Already exist" });
    }
    const hashedPassword = await hashPassword(password);

    const newUser = new adminSchema({
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

//AdminSignin
router.post("/adminSignin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminSchema.findOne({ email });
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

//ForgotPassword(Admin)
router.post("/sendVerificationEmail", async function (req, res, next) {
  try {
    const { email } = req.body;
    console.log(email);
    let user = await adminSchema.findOne({ email });
    console.log(email);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }

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
    let user = await adminSchema.findOne({ resetToken });
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

//SellerSignup
router.post("/sellerSignup", async function (req, res, next) {
  try {
    const { name, email, phone, address, gstin, password } = req.body;
    let sellerAlreadyExists = await sellerSchema.findOne({ email });
    if (sellerAlreadyExists) {
      return res.status(400).send({ message: "Seller Already exist" });
    }
    const hashedPassword = await hashPassword(password);

    const newSeller = new sellerSchema({
      name,
      email,
      phone,
      address,
      gstin,
      password: hashedPassword,
    });

    const savedSeller = await newSeller.save();

    Sellers = Sellers.concat(savedSeller);

    return res.status(200).send({
      success: true,
      data: savedSeller,
      all: Sellers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

//Delete Seller
router.delete("/seller/:id", async function (req, res, next) {
  try {
    const sellerId = req.params.id;
    const deletedSeller = await sellerSchema.findByIdAndDelete(sellerId);

    if (!deletedSeller) {
      return res.status(404).send({ message: "Seller not found" });
    }

    Sellers = Sellers.filter((seller) => seller._id.toString() !== sellerId);

    return res.status(200).send({
      success: true,
      data: deletedSeller,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

//get sellers list
router.get("/getSellersList", async function (req, res, next) {
  try {
    const sellerList = await sellerSchema.find({});
    return res.status(200).json(sellerList);
  } catch (error) {
    console.error("Error fetching seller list:", error);
    return res.status(500).json({ error: "Failed to fetch seller list" });
  }
});

//SellerSignin
router.post("/sellerSignin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await sellerSchema.findOne({ email });
    if (!seller) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log("password", password, seller.password);
    const isMatch = await decryptPassword(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.status(200).json({ msg: "Signed in successfully" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

//Forgot Password(Seller)
router.post("/verifySeller", async function (req, res, next) {
  try {
    const { email } = req.body;
    let seller = await sellerSchema.findOne({ email });

    if (!seller) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }

    seller.resetToken = verificationToken;
    await seller.save();
    const verificationLink = `http://localhost:3000/changePassword/${verificationToken}`;
    const mailOptions = {
      from: "coolgujjarboyabhinav@gmail.com",
      to: seller.email,
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
    console.error("Error in verifying seller:", err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});
router.put("/changePassword", async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;
    console.log();
    let seller = await sellerSchema.findOne({ resetToken });
    if (!seller) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }

    if (seller.resetToken !== resetToken) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await hashPassword(newPassword);

    seller.password = hashedPassword;
    seller.resetToken = undefined;

    await seller.save();

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error in /changePassword:", err);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

//Image Upload
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
