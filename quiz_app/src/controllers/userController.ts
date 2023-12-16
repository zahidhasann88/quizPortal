import { Request, Response } from "express";
import { successResponse, errorResponse } from "../middlewares/responseHandler";
import { CustomError } from "../helpers/errorConstructor";
import User from "../models/user.model";
import { generateToken } from "../helpers/jwtUtils";
import nodemailer from 'nodemailer';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const username = generateRandomUsername(name);

    const newUser = await User.create({
      name,
      username,
      email,
      password,
      date_registered: new Date(),
      role: role === "admin" ? "admin" : "user",
    });

    successResponse(res, { user: newUser }, 201, "User created successfully");
  } catch (error) {
    errorResponse(res, new CustomError("Failed to create user", 500));
  }
};

function generateRandomUsername(name: string): string {
  const randomPart = Math.random().toString(36).substring(2, 7);
  return name.replace(/\s/g, "") + randomPart;
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    successResponse(res, { users }, 200, "Users retrieved successfully");
  } catch (error) {
    errorResponse(res, new CustomError("Failed to fetch users", 500));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await User.findByPk(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    successResponse(res, { user }, 200, "User retrieved successfully");
  } catch (error) {
    errorResponse(res, new CustomError("Failed to fetch user", 500));
  }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const { name, email, password, role } = req.body;
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new CustomError('User not found', 404);
      }
  
      if (name) {
        user.setDataValue('name', name);
        const updatedUsername = generateRandomUsername(name);
        user.setDataValue('username', updatedUsername);
      }
      if (email) user.setDataValue('email', email);
      if (password) user.setDataValue('password', password);
      if (role) user.setDataValue('role', role);
  
      await user.save();
  
      successResponse(res, { user }, 200, 'User updated successfully');
    } catch (error) {
      errorResponse(res, new CustomError('Failed to update user', 500));
    }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new CustomError('User not found', 404);
      }
  
      await user.destroy();
  
      successResponse(res, {}, 200, 'User deleted successfully');
    } catch (error) {
      errorResponse(res, new CustomError('Failed to delete user', 500));
    }
  };

  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new CustomError('Invalid credentials', 401);
      }
      const isPasswordValid = password === user.password;
  
      if (!isPasswordValid) {
        throw new CustomError('Invalid credentials', 401);
      }
      const token = generateToken({ userId: user.user_id, email: user.email });
  
      successResponse(res, { message: 'Login successful', token }, 200);
    } catch (error) {
      errorResponse(res, error instanceof CustomError ? error : new CustomError('Failed to login', 500));
    }
  };

//   export const forgotPassword = async (req: Request, res: Response) => {
//     try {
//       const { email } = req.body;
  
//       const user = await User.findOne({ where: { email } });
  
//       if (!user) {
//         throw new CustomError('User not found', 404);
//       }
  
//       // Generate a temporary token (or link) for password reset
//       const resetToken = generateToken({ userId: user.user_id, username: user.username }, '1h'); // Adjust expiration as needed
  
//       // Send reset link/token to the user's email
//       const transporter = nodemailer.createTransport({
//         // Configure nodemailer with your email service details
//         service: 'gmail',
//         auth: {
//           user: 'jahidhasann67@gmail.com',
//           pass: 'your_email_password',
//         },
//       });
  
//       const mailOptions = {
//         from: 'your_email@gmail.com',
//         to: email,
//         subject: 'Password Reset Request',
//         text: `Click the link below to reset your password:\n\n${resetToken}`,
//       };
  
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           throw new CustomError('Failed to send reset email', 500);
//         }
//         console.log('Email sent: ' + info.response);
//       });
  
//       successResponse(res, { message: 'Password reset email sent' }, 200);
//     } catch (error) {
//       errorResponse(res, error instanceof CustomError ? error : new CustomError('Failed to process request', 500));
//     }
//   };
  