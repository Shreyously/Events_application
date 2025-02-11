import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     console.log("Token:", token); // Debugging

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized - No Token Provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging

//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized - Invalid Token" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");
//     console.log("User:", user); // Debugging

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in protectRoute middleware: ", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
  // backend/src/middleware/auth.middleware.js
  import jwt from "jsonwebtoken";
  import User from "../models/user.model.js";

  export const protectRoute = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      console.log("Token:", token);

      if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.userId).select("-password");
        console.log("User:", user);

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
      } catch (jwtError) {
        console.log("JWT Verification Error:", jwtError);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } catch (error) {
      console.log("Error in protectRoute middleware: ", error.message);
      res.status(401).json({ message: "Authentication failed" });
    }
  };