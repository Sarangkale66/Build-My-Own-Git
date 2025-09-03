import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: "Username or email is required"
      });
    }

    const query = {
      $or: []
    };

    if (username) {
      query.$or.push({ username: username.toLowerCase().trim() });
    }

    if (email) {
      query.$or.push({ email: email.toLowerCase().trim() });
    }

    const user = await userModel.findOne(query).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      dob: user.dob,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token: token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullname,
      bio,
      dob
    } = req.body;

    if (!username || !email || !password || !fullname || !dob) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
        required: ["username", "email", "password", "fullname", "dob"]
      });
    }

    if (!fullname.firstname || !fullname.lastname) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    const existingUser = await userModel.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { username: username.toLowerCase().trim() }
      ]
    });

    if (existingUser) {
      const field = existingUser.email === email.toLowerCase().trim() ? 'email' : 'username';
      return res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 13 || age > 120) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 13 and 120 years"
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      fullname: {
        firstname: fullname.firstname.trim(),
        lastname: fullname.lastname.trim()
      },
      bio: bio?.trim() || "",
      dob: birthDate
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      fullname: savedUser.fullname,
      bio: savedUser.bio,
      dob: savedUser.dob,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    };

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token: token
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export default { login, logout, register };