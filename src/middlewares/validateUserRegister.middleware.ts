import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { join } from "path";

const schema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).alphanum().required(),
});

const validateUserRegister = (req: Request, res: Response, next: NextFunction) => {
  let { error } = schema.validate(req.body);
  if (error) return res.json({ status: "err", msg: error.details[0].message });
  next();
};

export default validateUserRegister;
