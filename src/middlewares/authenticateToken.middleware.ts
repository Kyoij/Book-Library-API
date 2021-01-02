import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { secret } from "../config/index.config";
import JWT from "../models/JWT.model";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers["authorization"] as string | undefined;
  let authToken = authHeader?.split(" ")[1];
  if (!authToken) return res.status(401).end();
  jwt.verify(authToken, secret, (err, decoded: any) => {
    if (err) return res.status(403).end();
    JWT.findById(decoded.jti, (errr, jwt_t) => {
      if (errr || !jwt_t) return res.status(403).end();
      req.user = decoded;
      next();
    });
  });
}
