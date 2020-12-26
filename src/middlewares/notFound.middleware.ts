import { Request, Response, Router } from "express";

const notFound = Router();

notFound.use((req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

export default notFound;
