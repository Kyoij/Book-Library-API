import JWTR from "jwt-redis";
import redis from "redis";
import { NextFunction, Request, Response } from "express";
import { secret } from "../config/index.config";

const jwtr = new JWTR(redis.createClient());

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
  jwtr
    .verify(authToken, secret)
    .then((user: any) => {
      console.log(user.id);
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(403).end();
    });
}
