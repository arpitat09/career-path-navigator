import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";

const router = express.Router();

/* =========================================================
   GOOGLE CLIENT
========================================================= */

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

/* =========================================================
   CREATE JWT
========================================================= */

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/* =========================================================
   REGISTER
========================================================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* -------------------------
       Basic validation
    ------------------------- */

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    /* -------------------------
       Email validation
    ------------------------- */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    /* -------------------------
       Password validation
    ------------------------- */

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    /* -------------------------
       Check existing user
    ------------------------- */

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    /* -------------------------
       Hash password
    ------------------------- */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* -------------------------
       Create user
    ------------------------- */

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    /* -------------------------
       Create token
    ------------------------- */

    const token = createToken(user);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account. Please try again.",
    });
  }
});

/* =========================================================
   LOGIN
========================================================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /* -------------------------
       Basic validation
    ------------------------- */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    /* -------------------------
       Find user
    ------------------------- */

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -------------------------
       Google account protection
    ------------------------- */

    if (user.authProvider === "google" && !user.password) {
      return res.status(401).json({
        success: false,
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    /* -------------------------
       Check password
    ------------------------- */

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -------------------------
       Create token
    ------------------------- */

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login. Please try again.",
    });
  }
});

/* =========================================================
   GOOGLE LOGIN
========================================================= */

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is missing.",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("❌ GOOGLE_CLIENT_ID is missing.");

      return res.status(500).json({
        success: false,
        message: "Google authentication is not configured.",
      });
    }

    /* -------------------------
       Verify Google ID token
    ------------------------- */

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google credential.",
      });
    }

    const {
      sub: googleId,
      email,
      email_verified,
      name,
      picture,
    } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email could not be verified.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    /* -------------------------
       Find existing account
    ------------------------- */

    let user = await User.findOne({
      email: cleanEmail,
    });

    /* -------------------------
       Existing account
    ------------------------- */

    if (user) {
      user.googleId = googleId;
      user.picture = picture || user.picture || "";

      /*
       * If the account was originally created
       * with email/password, keep that provider.
       *
       * This allows an existing local account
       * to continue using its password.
       */

      if (!user.authProvider) {
        user.authProvider = "google";
      }

      await user.save();
    }

    /* -------------------------
       New Google account
    ------------------------- */

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email: cleanEmail,
        password: undefined,
        authProvider: "google",
        googleId,
        picture: picture || "",
      });
    }

    /* -------------------------
       Create CareerPath JWT
    ------------------------- */

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: "Google login successful.",
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    console.error("❌ Google login error:", error);

    return res.status(401).json({
      success: false,
      message: "Google authentication failed.",
    });
  }
});

/* =========================================================
   TEST AUTH API
========================================================= */

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authentication API is working.",
  });
});

/* =========================================================
   EXPORT
========================================================= */

export default router;