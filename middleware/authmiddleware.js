import JWT from "jsonwebtoken";
import userModel from "../models/usermodel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

// import JWT from "jsonwebtoken";
// import userModel from "../models/usermodel.js";

// // Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     // Check if authorization header is present
//     if (!req.headers.authorization) {
//       return res.status(401).send({
//         success: false,
//         message: "Unauthorized Access: Missing Authorization Header",
//       });
//     }

//     // Verify JWT token
//     const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Unauthorized Access: Invalid Token",
//     });
//   }
// };

// // Admin access
// export const isAdmin = async (req, res, next) => {
//   try {
//     // Check if user object is present in the request
//     if (!req.user || !req.user._id) {
//       return res.status(401).send({
//         success: false,
//         message: "Unauthorized Access: User Not Authenticated",
//       });
//     }

//     // Find user by ID
//     const user = await userModel.findById(req.user._id);
//     if (!user || user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "Unauthorized Access: User is not an admin",
//       });
//     }

//     next(); // User is an admin, proceed
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middleware",
//     });
//   }
// };
