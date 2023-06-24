import { Request, Response, Router } from "express";
import { validate } from "../middlewares/parser";
import {
  CreateUserDTO,
  EditUserDTO,
  UserDTO,
  createUser,
  editUser,
  getUserByEmail,
} from "../controllers";

const router = Router();

router.get("/", validate(UserDTO), async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const user = await getUserByEmail({ email: email as string });
    res.status(200).json({ ...user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/new",
  validate(CreateUserDTO),
  async (req: Request, res: Response) => {
    const user = req.body;
    try {
      await createUser(user);
      res.status(201).json({ message: "User created" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/edit/:userId",
  validate(EditUserDTO),
  async (req: Request, res: Response) => {
    const user = req.body;
    const { userId: id } = req.params;
    try {
      const updatedUser = await editUser({ ...user, userId: id });
      res.status(201).json({ user: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
