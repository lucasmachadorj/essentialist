import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const validate = (schema: AnyZodObject): ExpressMiddleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: "Invalid request format" });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
