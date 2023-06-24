import { Router } from "express";
import userRoutes from "./users";

const router = Router();

router.use("/users", userRoutes);
router.get("/", (_, res) => res.send("Ok"));

export default router;
