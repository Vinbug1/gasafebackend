const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// Get all vendor users
router.get("/vendor", async (req, res) => {
  try {
    const userList = await User.find({ role: "vendor" }).select(
      "-passwordHash"
    );
    res.send(userList);
  } catch (error) {
    console.error("Error getting vendor users:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const userList = await User.find({ role: "Buyer" }).select("-passwordHash");
    res.send(userList);
  } catch (error) {
    console.error("Error getting Buyer users:", error);
    res.status(500).send("Internal server error");
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).send("Internal server error");
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with the same email already exists");
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.error("Error creating a new user:", error);
    res.status(500).send("Internal server error");
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let passwordHash = existingUser.passwordHash;
    if (password) {
      passwordHash = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
      },
      { new: true }
    );

    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).send("Internal server error");
  }
});

// User login
router.post("/login", async (req, res) => {
  const secret = process.env.secret;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );
    //const { id,name, accountNumber, role } = user;
    res.status(200).json({
      
      image: user.image,
      userId: user.id,
      email: user.email,
      token,
      role: user.role,
      name: user.name,
      accountNumber: user.accountNumber,
      phone: user.phoneNumber,
      address: user.address,
    });
  } catch (error) {
    console.error("Error user login:", error);
    res.status(500).send("Internal server error");
  }
});

// router.post('/login', async (req, res) => {
//   const secret = process.env.secret;

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return res.status(400).send('Invalid password');
//     }

//     const token = jwt.sign(
//       {
//         userId: user.id,
//         isAdmin: user.isAdmin,
//       },
//       secret,
//       { expiresIn: '1d' }
//     );

//     res.status(200).send({  user:user.id, user: user.email, token, user: user.role });
//   } catch (error) {
//     console.error('Error user login:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// Register vendor and user
router.post("/register", uploadOptions.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      role,
      businessName,
      businessPhone,
      businessEmail,
      address,
      bank,
      service,
      serviceCharge,
      deliveryCharge,
      accountNumber,
      accountName,
      facilityCertificationStatus,
      leakDetectionSystem,
      emergencyResponseStatus,
      staffTraining,
      riskAssessmentAwarenessStatus,
      riskControlFramework,
      hsePolicy,
      lPGHazardsKnowledge,
      lPGHandlingProcedure,
      cylinderManagementKnowledge,
      hazardousAreaClassification,
      cylinderCertificationStatus,
      hoseLineCheck,
      cylinderSafetyCheck,
      lpgSafetyKnowledge,
      educationalQualification,
      cylinderSize,
      gender,
    } = req.body;

    const file = req.file;
    if (!file) {
      return res.status(400).send("No image in the request");
    }
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    const passwordHash = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      phoneNumber,
      role,
      image: `${basePath}${fileName}`,
      businessName,
      businessPhone,
      businessEmail,
      address,
      bank,
      service,
      serviceCharge,
      deliveryCharge,
      accountNumber,
      accountName,
      facilityCertificationStatus,
      leakDetectionSystem,
      emergencyResponseStatus,
      staffTraining,
      riskAssessmentAwarenessStatus,
      riskControlFramework,
      hsePolicy,
      lPGHazardsKnowledge,
      lPGHandlingProcedure,
      cylinderManagementKnowledge,
      hazardousAreaClassification,
      cylinderCertificationStatus,
      hoseLineCheck,
      cylinderSafetyCheck,
      lpgSafetyKnowledge,
      educationalQualification,
      cylinderSize,
      gender,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.error("Error registering vendors and user:", error);
    res.status(500).send("Internal server error");
  }
});


// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).send("Internal server error");
  }
});

// Get user count
router.get("/get/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments({});

    res.send({
      userCount,
    });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
