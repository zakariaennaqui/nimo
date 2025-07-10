// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel';

// // Extend the Request interface to include user property
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         role: string;
//       };
//     }
//   }
// }

// interface JwtPayload {
//   id: string;
// }
// export const protect = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     console.log("Headers:", req.headers);
    
//     let token: string | undefined;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//       console.log("Token extracted:", token);
//     }

//     if (!token) {
//       console.log("No token found");
//       res.status(401).json({
//         success: false,
//         message: 'Not authorized to access this route',
//       });
//       return;
//     }

//     try {
//       console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
      
//       // Verify token
//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET as string
//       ) as JwtPayload;
      
//       console.log("Decoded token:", decoded);

      
//       // Find user
//       const user = await User.findById(decoded.id);

//       if (!user) {
//         res.status(401).json({
//           success: false,
//           message: 'User not found',
//         });
//         return;
//       }

//       // Attach user to the request
//       req.user = {
//         id: user._id.toString(),
//         role: user.role
//       };

//       next();
//     } catch (error) {
//       console.error("JWT verification error:", error);
//       res.status(401).json({
//         success: false,
//         message: 'Invalid token',
//       });
//       return;
//     }
//   } catch (error) {
//     console.error("Middleware error:", error);
//     res.status(500).json({
//       success: false,
//       message: error instanceof Error ? error.message : 'Server error',
//     });
//   }
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookie (alternative)
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Find user and attach to request
    const user = await User.findById(decoded.id).select('-password') as { _id: string; role: string } | null;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      role: user.role
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }
    next();
  };
};