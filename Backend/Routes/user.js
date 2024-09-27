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

// [ADMIN]

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
    let user = await adminSchema.findOne({ email });

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


// Fetch User Profile
router.get('/adminProfile', async (req, res) => {
  try {
    const user = await adminSchema.find(email);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update User Profile
router.put('/adminUpdate', async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await adminSchema.find(email);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user info
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


//[SELLER]

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

//SellerSignin
router.post("/sellerSignin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await sellerSchema.findOne({ email });
    if (!seller) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await decryptPassword(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.status(200).json({ msg: "Signed in successfully" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// Get Sellers List
router.get("/getSellersList", async function (req, res, next) {
  try {
    const sellerList = await sellerSchema.find({});
    return res.status(200).json({ success: true, sellers: sellerList });
  } catch (error) {
    console.error("Error fetching seller list:", error);
    return res.status(500).json({ error: "Failed to fetch seller list" });
  }
});

// Get Seller by ID
router.get("/getSeller/:id", async function (req, res, next) {
  try {
    const sellerId = req.params.id;
    const seller = await sellerSchema.findById(sellerId); // Use `findById` instead of `find`

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json({ success: true, data: seller });
  } catch (error) {
    console.error("Error fetching seller:", error);
    return res.status(500).json({ error: "Failed to fetch seller" });
  }
});

// Delete Seller by ID
router.delete("/deleteSeller/:id", async function (req, res, next) {
  try {
    const sellerId = req.params.id;
    const deletedSeller = await sellerSchema.findByIdAndDelete(sellerId);

    if (!deletedSeller) {
      return res.status(404).send({ message: "Seller not found" });
    }
    return res.status(200).send({
      success: true,
      message: "Seller deleted successfully",
      data: deletedSeller,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

// Update Seller by ID (PUT)
router.put("/updateSeller/:id", async function (req, res, next) {
  try {
    const sellerId = req.params.id;
    const updateData = req.body;

    const updatedSeller = await sellerSchema.findByIdAndUpdate(sellerId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update respects schema validation
    });

    if (!updatedSeller) {
      return res.status(404).send({ message: "Seller not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Seller updated successfully",
      data: updatedSeller,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
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
