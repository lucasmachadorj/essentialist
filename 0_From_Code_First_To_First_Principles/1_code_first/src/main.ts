import express, { Request, Response } from "express";
import { CreateUserDTO, createUser } from "./controllers/createUser";
import { validate } from "./middlewares/parser";
import { EditUserDTO, editUser } from "./controllers/editUser";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

app.post(
  "/users/new",
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

app.put(
  "/users/edit/:userId",
  validate(EditUserDTO),
  async (req: Request, res: Response) => {
    const user = req.body;
    const { userId: id } = req.params;
    try {
      await editUser({ ...user, id });
      res.status(201).json({ message: "User updated" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.listen(8001, () => console.log("Server is running"));
